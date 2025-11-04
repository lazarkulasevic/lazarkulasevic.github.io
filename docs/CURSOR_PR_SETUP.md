# Cursor PR Comments Setup

This workflow allows you to interact with your PRs by commenting `/cursor <your prompt>` on any pull request. The workflow will automatically process your prompt and apply changes to the PR branch.

## Setup Instructions

### 1. Add GitHub Secrets

You need to add an AI API key as a GitHub secret. Choose one:

**Option A: OpenAI (GPT-4)**
1. Get your API key from https://platform.openai.com/api-keys
2. Go to your repository → Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `OPENAI_API_KEY`
5. Value: Your OpenAI API key

**Option B: Anthropic (Claude)**
1. Get your API key from https://console.anthropic.com/
2. Go to your repository → Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `ANTHROPIC_API_KEY`
5. Value: Your Anthropic API key

### 2. How to Use

1. Create a Pull Request (or use an existing one)
2. Comment on the PR with: `/cursor <your instruction>`
   
   Example:
   ```
   /cursor Add a new bullet point to the Symphony.is worklog about AI platform development
   ```
   
   Or:
   ```
   /cursor Fix the typo in line 70 of the portfolio page
   ```

3. The workflow will:
   - Process your prompt
   - Make the requested changes
   - Commit and push to the PR branch
   - Leave a comment when done

### 3. What the Workflow Does

- ✅ Triggers on PR comments starting with `/cursor`
- ✅ Extracts your prompt (everything after `/cursor`)
- ✅ Analyzes the current PR context (changed files, etc.)
- ✅ Uses AI to generate and apply changes
- ✅ Commits changes with a descriptive message
- ✅ Pushes to the PR branch automatically

### 4. Example Comments

```
/cursor Update the portfolio worklog summary for Symphony.is
```

```
/cursor Add a new technology to the tech stack list
```

```
/cursor Fix grammar in the "Briefly About Me" section
```

```
/cursor Add a new side project entry for my latest project
```

### 5. Troubleshooting

**Workflow doesn't trigger:**
- Make sure your comment starts exactly with `/cursor` (case-sensitive)
- Check that the workflow file is in `.github/workflows/`
- Verify the PR is not a draft (if your workflow has that restriction)

**Changes not applying:**
- Check the workflow logs in Actions tab
- Ensure your AI API key is set correctly
- Verify the prompt is clear and specific

**API errors:**
- Check your API key is valid and has credits
- Verify the API key has the correct permissions
- Check rate limits on your API account

### 6. Security Notes

- Your AI API key is stored securely as a GitHub secret
- The key is only used during workflow execution
- Consider using a separate API key with limited permissions for this workflow
- Review all AI-generated changes before merging
