#!/usr/bin/env node

/**
 * Forwards PR comments to Cursor API to continue conversation
 */

const { execSync } = require('child_process');

const PROMPT = process.env.PROMPT;
const PR_BRANCH = process.env.PR_BRANCH;
const CURSOR_API_KEY = process.env.CURSOR_API_KEY;
const CURSOR_API_ENDPOINT = process.env.CURSOR_API_ENDPOINT || 'https://api.cursor.com/v1/chat/completions';

if (!PROMPT) {
  console.error('No prompt provided');
  process.exit(1);
}

if (!CURSOR_API_KEY) {
  console.error('No Cursor API key found. Please set CURSOR_GITHUB_PERSONAL_API_KEY secret.');
  process.exit(1);
}

async function callCursorAPI(prompt) {
  console.log(`🌐 Calling Cursor API with prompt: ${prompt.substring(0, 100)}...`);
  
  const response = await fetch(CURSOR_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CURSOR_API_KEY}`
    },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Cursor API error:', errorText);
    throw new Error(`Cursor API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  
  // Extract response content (handle different response structures)
  let content;
  if (data.choices?.[0]?.message?.content) {
    content = data.choices[0].message.content;
  } else if (data.content) {
    content = typeof data.content === 'string' ? data.content : data.content[0]?.text || data.content[0];
  } else if (data.message) {
    content = data.message;
  } else {
    console.error('Unexpected response structure:', JSON.stringify(data, null, 2));
    throw new Error('Unexpected Cursor API response structure');
  }
  
  return content;
}

async function commitChanges() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (!status.trim()) {
      console.log('No changes to commit');
      return;
    }

    execSync('git add -A', { stdio: 'inherit' });
    const commitMessage = `Apply changes from /cursor: ${PROMPT.substring(0, 50)}${PROMPT.length > 50 ? '...' : ''}`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
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
    
    const response = await callCursorAPI(PROMPT);
    console.log('✅ Cursor API response received');
    console.log('Response:', response.substring(0, 500));
    
    // Cursor may have applied changes directly, or response contains instructions
    // Check if there are any changes to commit
    await commitChanges();
    
    console.log('✅ All done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
