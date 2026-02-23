const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/**
 * Normalization maps for consistent casing
 */
const TECH_NORMALIZATION = {
  'typescript': 'TypeScript',
  'javascript': 'JavaScript',
  'next': 'Next.js',
  'node': 'Node.js',
  'github actions': 'GitHub Actions',
  'postgresql': 'PostgreSQL',
  'tiptap': 'TipTap',
  'signalr': 'SignalR',
  'css': 'CSS',
  'scss': 'SCSS',
  'postcss': 'PostCSS',
  'html': 'HTML',
  'vite': 'Vite',
  'webpack': 'Webpack',
  'npm': 'npm',
  'pnpm': 'pnpm',
  'express': 'Express',
  'vitest': 'Vitest',
  'jest': 'Jest',
  'cypress': 'Cypress',
  'vitepress': 'VitePress',
  'zod': 'Zod',
  'redux': 'Redux',
  'jotai': 'Jotai',
  'jenkins': 'Jenkins',
  'docker': 'Docker',
  'vue': 'Vue',
  'react': 'React',
  'cloud firestore': 'Cloud Firestore'
}

const CONCEPT_NORMALIZATION = {
  'microfrontends': 'Microfrontends',
  'ssr': 'SSR',
  'vercel': 'Vercel',
  'firebase': 'Firebase',
  'google cloud platform': 'Google Cloud Platform',
  'google api': 'Google API',
  'sonarqube': 'SonarQube',
  'azure application insights': 'Azure Application Insights',
  'gitflow': 'GitFlow',
  'trunk-based development': 'Trunk-Based Development',
  'ci/cd': 'CI/CD',
  'feature flags': 'Feature Flags',
  'kanban': 'Kanban',
  'scrum': 'Scrum'
}

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
 * Normalize a comma-separated list using a normalization map
 */
function normalizeList(csvString, normalizationMap) {
  if (!csvString) return []
  
  return csvString
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => {
      const lowerItem = item.toLowerCase()
      return normalizationMap[lowerItem] || item
    })
}

/**
 * Parse date string (handles formats like "01 Dec 2022" or "Present")
 */
function parseDate(dateStr) {
  if (!dateStr || dateStr === 'Present') return null
  
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return null
    return date
  } catch {
    return null
  }
}

/**
 * Format date to "Mon YYYY" format (e.g., "Dec 2022")
 */
function formatDate(dateStr) {
  if (!dateStr || dateStr === 'Present') return 'Present'
  
  const date = parseDate(dateStr)
  if (!date) return dateStr
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[date.getMonth()]} ${date.getFullYear()}`
}

/**
 * Extract structured portfolio data
 */
function extractPortfolioData() {
  const portfolioPath = path.join(__dirname, '../docs/portfolio/index.md')
  const content = fs.readFileSync(portfolioPath, 'utf-8')
  const { frontmatter } = parseFrontmatter(content)

  // Extract profile
  const profile = {
    name: frontmatter.profile?.name || frontmatter.title || 'Lazar Kulasevic',
    title: frontmatter.profile?.title || 'Software Engineer',
    summary: frontmatter.profile?.summary || 'Frontend-specialized Software Engineer focused on product development.'
  }

  // Extract and normalize technical skills
  const technicalSkills = normalizeList(frontmatter.technologies || '', TECH_NORMALIZATION)

  // Extract and normalize concepts and platforms
  const conceptsAndPlatforms = normalizeList(frontmatter.concepts || '', CONCEPT_NORMALIZATION)

  // Extract work experience
  const workExperience = (frontmatter.worklog || []).map(job => ({
    company: job.company || 'Company',
    role: job.title || 'Position',
    period: `${formatDate(job.date?.start)} - ${formatDate(job.date?.end)}`,
    highlights: Array.isArray(job.summary) ? job.summary : []
  }))

  // Extract side projects
  const sideProjects = (frontmatter.sideProjects || []).map(project => ({
    name: project.name || '',
    description: project.description || '',
    link: project.link || ''
  }))

  // Extract contact info
  const contact = {
    linkedin: frontmatter.contact?.linkedin || 'https://www.linkedin.com/in/lazarkulasevic/',
    github: frontmatter.contact?.github || 'https://github.com/lazarkulasevic'
  }

  return {
    profile,
    technicalSkills,
    conceptsAndPlatforms,
    workExperience,
    sideProjects,
    contact
  }
}

/**
 * Extract blog articles (only type: article)
 */
function extractBlogArticles() {
  const blogDir = path.join(__dirname, '../docs/blog')
  const files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')

  const articles = []

  for (const file of files) {
    const filePath = path.join(blogDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { frontmatter } = parseFrontmatter(content)

    // Only include articles
    if (frontmatter.type !== 'article') continue

    const title = frontmatter.title || 'Untitled'
    const topics = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    const url = `https://deployandpray.com/blog/${file.replace('.md', '')}`
    const publishedOn = frontmatter.publishedOn

    articles.push({
      title,
      topics,
      url,
      publishedOn,
      fileName: file
    })
  }

  // Sort by published date (newest first), fall back to filename
  articles.sort((a, b) => {
    const dateA = parseDate(a.publishedOn)
    const dateB = parseDate(b.publishedOn)

    if (dateA && dateB) {
      return dateB.getTime() - dateA.getTime()
    }

    if (dateA) return -1
    if (dateB) return 1

    return a.fileName.localeCompare(b.fileName)
  })

  // Remove temporary sorting fields
  return articles.map(({ title, topics, url }) => ({ title, topics, url }))
}

/**
 * Generate knowledge base
 */
function generateKnowledgeBase() {
  console.log('Extracting knowledge base from markdown files...')

  try {
    // Extract portfolio data
    const portfolioData = extractPortfolioData()

    // Extract blog articles
    const articles = extractBlogArticles()

    // Build the structured knowledge base
    const knowledgeBase = {
      generatedAt: new Date().toISOString(),
      profile: portfolioData.profile,
      technicalSkills: portfolioData.technicalSkills,
      conceptsAndPlatforms: portfolioData.conceptsAndPlatforms,
      workExperience: portfolioData.workExperience,
      sideProjects: portfolioData.sideProjects,
      blog: {
        website: 'https://deployandpray.com/blog',
        articles: articles
      },
      contact: portfolioData.contact
    }

    // Always output to public/ - VitePress copies it to dist/ during build
    const outputPath = path.join(__dirname, '../docs/public/knowledge-base.json')

    // Ensure directory exists
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, JSON.stringify(knowledgeBase, null, 2), 'utf-8')

    console.log('✅ Knowledge base generated successfully!')
    console.log(`📝 Output: ${outputPath}`)
    console.log(`📊 Profile: ${knowledgeBase.profile.name}`)
    console.log(`🔧 Technical skills: ${knowledgeBase.technicalSkills.length}`)
    console.log(`💼 Work experience entries: ${knowledgeBase.workExperience.length}`)
    console.log(`🚀 Side projects: ${knowledgeBase.sideProjects.length}`)
    console.log(`📚 Blog articles: ${knowledgeBase.blog.articles.length}`)

  } catch (error) {
    console.error('❌ Error generating knowledge base:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run the generator
generateKnowledgeBase()
