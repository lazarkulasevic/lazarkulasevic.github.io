const fs = require('fs')
const path = require('path')
const lunr = require('lunr')

const CONTENT_DIR = path.join(__dirname, '../docs/blog')
const OUTPUT_FILE = path.join(__dirname, '../docs/public', 'search-index.json')

function getDocuments(dir) {
  const documents = []
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      documents.push(...getDocuments(filePath))
    } else if (file.endsWith('.md') && file !== 'index.md') {
      const content = fs.readFileSync(filePath, 'utf-8')
      const id = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/')
      documents.push({ id, content })
    }
  })

  return documents
}

function generateIndex(documents) {
  return lunr(function () {
    this.ref('id')
    this.field('content')

    documents.forEach((doc) => {
      this.add(doc)
    })
  })
}

const documents = getDocuments(CONTENT_DIR)
const index = generateIndex(documents)
const serializedIndex = JSON.stringify(index)

fs.writeFileSync(OUTPUT_FILE, serializedIndex, 'utf-8')

console.log('Search index generated.')
