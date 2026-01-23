const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/**
 * Parse frontmatter from markdown file
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)

  if (!match) return { frontmatter: {}, content: content }

  const frontmatterText = match[1]
  const contentWithoutFrontmatter = content.slice(match[0].length)

  try {
    const frontmatter = yaml.load(frontmatterText) || {}
    return { frontmatter, content: contentWithoutFrontmatter }
  } catch (error) {
    console.warn('Failed to parse frontmatter:', error.message)
    return { frontmatter: {}, content: contentWithoutFrontmatter }
  }
}

/**
 * Extract portfolio content
 */
function extractPortfolio() {
  const portfolioPath = path.join(__dirname, '../docs/portfolio/index.md')
  const content = fs.readFileSync(portfolioPath, 'utf-8')

  const { frontmatter, content: markdownContent } = parseFrontmatter(content)

  // Extract technologies and concepts from frontmatter
  const technologies = frontmatter.technologies || ''
  const concepts = frontmatter.concepts || ''

  // Clean markdown content
  let cleanContent = markdownContent
    // Remove Vue components
    .replace(/<Timeline\s*\/>/g, '')
    .replace(/<TagGroup[^>]*\/>/g, '')
    .replace(/<script setup>[\s\S]*?<\/script>/g, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove emoji shortcodes (optional - can keep them)
    .replace(/:[\w_]+:/g, '')
    .trim()

  // Build structured portfolio content
  const portfolio = `
ABOUT LAZAR KULASEVIC:

${cleanContent}

TECHNICAL SKILLS:
${technologies}

CONCEPTS & PLATFORMS:
${concepts}

WORK EXPERIENCE:
${frontmatter.worklog ? formatWorkExperience(frontmatter.worklog) : ''}
`.trim()

  return portfolio
}

/**
 * Format work experience from frontmatter
 */
function formatWorkExperience(worklog) {
  if (!Array.isArray(worklog)) return ''

  return worklog.map((job, index) => {
    const title = job.title || 'Position'
    const company = job.company || 'Company'
    const dateStart = job.date?.start || 'Start Date'
    const dateEnd = job.date?.end || 'Present'
    const summary = Array.isArray(job.summary) ? job.summary.join('\n- ') : ''

    return `
${index + 1}. ${title} at ${company} (${dateStart} - ${dateEnd})
- ${summary}
    `.trim()
  }).join('\n\n')
}

/**
 * Extract blog posts
 */
function extractBlogPosts() {
  const blogDir = path.join(__dirname, '../docs/blog')
  const files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .sort()

  return files.map(file => {
    const filePath = path.join(blogDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { frontmatter } = parseFrontmatter(content)

    const title = frontmatter.title || 'Untitled'
    const description = frontmatter.description || ''
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    const url = `https://deployandpray.com/blog/${file.replace('.md', '')}`

    return { title, description, tags, url }
  })
}

/**
 * Format blog posts for knowledge base
 */
function formatBlogPosts(blogPosts) {
  return blogPosts.map((post, index) => {
    const tagsStr = post.tags.length > 0 ? `Topics: ${post.tags.join(', ')}` : ''

    return `
${index + 1}. "${post.title}"
   ${post.description ? `${post.description.slice(0, 150)}${post.description.length > 150 ? '...' : ''}` : ''}
   ${tagsStr}
   Read: ${post.url}
    `.trim()
  }).join('\n\n')
}

/**
 * Generate knowledge base
 */
function generateKnowledgeBase() {
  console.log('Extracting knowledge base from markdown files...')

  try {
    const portfolio = extractPortfolio()
    const blogPosts = extractBlogPosts()
    const blogSection = formatBlogPosts(blogPosts)

    const knowledgeBase = `You are an AI assistant helping recruiters learn about Lazar Kulasevic, a Software Engineer.

${portfolio}

BLOG & TECHNICAL WRITING:

Lazar writes technical articles about software development on his blog at deployandpray.com/blog. Here are his published articles:

${blogSection}

INSTRUCTIONS FOR AI ASSISTANT:
- Be professional, friendly, and concise in your responses
- When asked about specific skills or technologies, provide relevant examples from work experience
- When asked about blog topics, list relevant articles with links
- Encourage visiting deployandpray.com/blog for full technical articles
- For detailed questions about blog content, provide the article link rather than trying to summarize
- Always mention LinkedIn (https://www.linkedin.com/in/lazarkulasevic/) for direct contact
- Keep responses focused on Lazar's professional experience and technical expertise
- If unsure about something not covered here, suggest checking the portfolio website or reaching out directly`

    // Determine output path based on NODE_ENV or dist folder existence
    const distPath = path.join(__dirname, '../docs/.vitepress/dist/knowledge-base.json')
    const publicPath = path.join(__dirname, '../docs/public/knowledge-base.json')

    // Use dist if it exists and has content (post-build), otherwise public (for dev)
    const distDir = path.join(__dirname, '../docs/.vitepress/dist')
    const distHtmlExists = fs.existsSync(path.join(distDir, 'index.html'))
    const outputPath = distHtmlExists ? distPath : publicPath

    const jsonOutput = {
      generatedAt: new Date().toISOString(),
      content: knowledgeBase,
      stats: {
        portfolioExtracted: true,
        blogPostsCount: blogPosts.length
      }
    }

    // Ensure directory exists
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2), 'utf-8')

    console.log('✅ Knowledge base generated successfully!')
    console.log(`📝 Output: ${outputPath}`)
    console.log(`📊 Portfolio content extracted`)
    console.log(`📚 Blog posts extracted: ${blogPosts.length}`)

  } catch (error) {
    console.error('❌ Error generating knowledge base:', error.message)
    process.exit(1)
  }
}

// Run the generator
generateKnowledgeBase()
