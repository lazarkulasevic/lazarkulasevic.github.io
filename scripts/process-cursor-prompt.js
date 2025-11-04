#!/usr/bin/env node

/**
 * Processes /cursor comments from PRs and applies AI-generated changes
 * Supports OpenAI and Anthropic APIs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROMPT = process.env.PROMPT;
const PR_NUMBER = process.env.PR_NUMBER;
const PR_BRANCH = process.env.PR_BRANCH;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!PROMPT) {
  console.error('No prompt provided');
  process.exit(1);
}

// Determine which AI service to use
const useOpenAI = !!OPENAI_API_KEY;
const useAnthropic = !!ANTHROPIC_API_KEY;

if (!useOpenAI && !useAnthropic) {
  console.error('No AI API key found. Please set OPENAI_API_KEY or ANTHROPIC_API_KEY secret.');
  process.exit(1);
}

async function getFileContext() {
  // Get list of changed files in PR
  try {
    // Try to get base branch from environment or default to master
    const baseBranch = process.env.BASE_BRANCH || 'master';
    
    let changedFiles = [];
    try {
      changedFiles = execSync(`git diff --name-only HEAD origin/${baseBranch}`, { encoding: 'utf-8' })
        .split('\n')
        .filter(line => line.trim());
    } catch (error) {
      // If base branch doesn't exist, just get current files
      console.log('Base branch not found, using current branch files');
      changedFiles = execSync('git ls-files', { encoding: 'utf-8' })
        .split('\n')
        .filter(line => line.trim());
    }
    
    const fileContents = {};
    // Limit to reasonable number of files to avoid token limits
    const filesToRead = changedFiles.slice(0, 20);
    for (const file of filesToRead) {
      if (fs.existsSync(file) && !file.includes('node_modules') && !file.includes('.git')) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          // Only include files under certain size (100KB)
          if (content.length < 100000) {
            fileContents[file] = content;
          }
        } catch (error) {
          console.warn(`Could not read file ${file}:`, error.message);
        }
      }
    }
    
    return { changedFiles, fileContents };
  } catch (error) {
    console.warn('Error getting file context:', error.message);
    return { changedFiles: [], fileContents: {} };
  }
}

async function callAI(prompt, context) {
  const systemPrompt = `You are a code assistant that helps modify code based on user prompts. 
You should respond with a JSON object containing:
- "changes": An array of objects, each with:
  - "file": The file path to modify (relative to repo root)
  - "action": "edit" or "create" or "delete"
  - "content": The full new content of the file (for edit/create) - use this for small files
  - "old_string" and "new_string": For precise edits (preferred for large files to avoid full replacement)

Current context:
- Working directory: ${process.cwd()}
- This is a VitePress documentation site
- Main content files are in docs/ directory
- Portfolio page is at docs/portfolio/index.md
- Changed files: ${context.changedFiles.join(', ') || 'None'}

IMPORTANT RULES: 
- For markdown files with YAML frontmatter, preserve the frontmatter exactly - never modify it unless explicitly requested
- For code files, maintain existing formatting, indentation, and code style
- Only modify files that are relevant to the user's request
- Use "old_string" and "new_string" for precise edits when possible (better for large files)
- Return ONLY valid JSON, no markdown code blocks, no explanations outside JSON
- The JSON must be valid and parseable

Example response format:
{
  "changes": [
    {
      "file": "docs/portfolio/index.md",
      "action": "edit",
      "old_string": "      - CRM Tool for HR",
      "new_string": "      - AI Platform Development\n      - CRM Tool for HR"
    }
  ]
}`;

  const fileContext = Object.entries(context.fileContents)
    .slice(0, 10) // Limit to 10 files to avoid token limits
    .map(([file, content]) => {
      // Truncate very long files but show structure
      const preview = content.length > 5000 
        ? content.substring(0, 5000) + '\n... (file continues)'
        : content;
      return `File: ${file}\n\`\`\`\n${preview}\n\`\`\``;
    }).join('\n\n');

  const fullPrompt = `${systemPrompt}\n\nUser request: ${prompt}\n\n${fileContext || 'No file context available'}`;

  if (useOpenAI) {
    return await callOpenAI(fullPrompt);
  } else if (useAnthropic) {
    return await callAnthropic(fullPrompt);
  }
}

async function callOpenAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'You are a helpful code assistant that returns only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  // Remove markdown code blocks if present
  let jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  // Try to extract JSON if it's wrapped in other text
  const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonContent = jsonMatch[0];
  }
  
  try {
    return JSON.parse(jsonContent);
  } catch (error) {
    console.error('Failed to parse JSON response:', jsonContent.substring(0, 500));
    throw new Error(`Invalid JSON response from AI: ${error.message}`);
  }
}

async function callAnthropic(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        { role: 'user', content: prompt }
      ],
      system: 'You are a helpful code assistant that returns only valid JSON.'
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${error}`);
  }

  const data = await response.json();
  const content = data.content[0].text;
  
  // Remove markdown code blocks if present
  let jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  // Try to extract JSON if it's wrapped in other text
  const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonContent = jsonMatch[0];
  }
  
  try {
    return JSON.parse(jsonContent);
  } catch (error) {
    console.error('Failed to parse JSON response:', jsonContent.substring(0, 500));
    throw new Error(`Invalid JSON response from AI: ${error.message}`);
  }
}

function applyChanges(changes) {
  if (!changes || !Array.isArray(changes)) {
    throw new Error('Invalid changes format');
  }

  for (const change of changes) {
    const { file, action, content, old_string, new_string } = change;
    
    if (!file) {
      console.warn('Skipping change with no file specified');
      continue;
    }

    const filePath = path.resolve(file);
    const dirPath = path.dirname(filePath);

    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    switch (action) {
      case 'create':
      case 'edit':
        if (old_string && new_string) {
          // Precise edit using old_string and new_string
          if (!fs.existsSync(filePath)) {
            throw new Error(`File ${file} does not exist for edit`);
          }
          const currentContent = fs.readFileSync(filePath, 'utf-8');
          if (!currentContent.includes(old_string)) {
            throw new Error(`Could not find old_string in ${file}`);
          }
          const newContent = currentContent.replace(old_string, new_string);
          fs.writeFileSync(filePath, newContent, 'utf-8');
          console.log(`✅ Updated ${file} (precise edit)`);
        } else if (content) {
          // Full file replacement
          fs.writeFileSync(filePath, content, 'utf-8');
          console.log(`✅ ${action === 'create' ? 'Created' : 'Updated'} ${file}`);
        } else {
          throw new Error(`No content provided for ${action} action on ${file}`);
        }
        break;
      
      case 'delete':
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`✅ Deleted ${file}`);
        } else {
          console.warn(`File ${file} does not exist, skipping delete`);
        }
        break;
      
      default:
        console.warn(`Unknown action: ${action} for file ${file}`);
    }
  }
}

async function commitChanges() {
  try {
    // Check if there are any changes
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (!status.trim()) {
      console.log('No changes to commit');
      return;
    }

    // Stage all changes
    execSync('git add -A', { stdio: 'inherit' });

    // Commit
    const commitMessage = `Apply changes from /cursor comment: ${PROMPT.substring(0, 50)}${PROMPT.length > 50 ? '...' : ''}`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

    // Push to PR branch
    execSync(`git push origin ${PR_BRANCH}`, { stdio: 'inherit' });
    
    console.log('✅ Changes committed and pushed');
  } catch (error) {
    console.error('Error committing changes:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('📝 Processing prompt:', PROMPT);
    console.log('🔍 Getting file context...');
    
    const context = await getFileContext();
    console.log(`📁 Found ${context.changedFiles.length} changed files`);
    
    console.log('🤖 Calling AI service...');
    const aiResponse = await callAI(PROMPT, context);
    
    console.log('📝 Applying changes...');
    applyChanges(aiResponse.changes);
    
    console.log('💾 Committing changes...');
    await commitChanges();
    
    console.log('✅ All done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
