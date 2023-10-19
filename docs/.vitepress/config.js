import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'

const links = []

export default {
  lang: 'en-US',
  title: 'Lazar Kulasevic',
  description: 'Lazar Kulasevic is a Software Engineer based in Nis, Serbia.',
  head: [
    ['meta', { property: 'author', content: 'Lazar Kulasevic' }],
    ['meta', { name: 'og:site_name', content: 'Lazar Kulasevic' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@else_clause' }],
    ['meta', { name: 'twitter:creator', content: '@else_clause' }]
  ],
  cleanUrls: true,
  themeConfig: {
    logo: { src: '/logo.png', width: 24, height: 24 },
    aside: true,
    outline: {
      level: 'deep'
    },
    nav: [
      {
        text: 'Portfolio',
        items: [
          {
            text: 'Intro',
            link: '/portfolio/#intro'
          },
          {
            text: 'Experience',
            link: '/portfolio/#experience'
          },
          {
            text: 'Projects',
            link: '/portfolio/#projects'
          },
          {
            text: 'Tech Stack',
            link: '/portfolio/#tech-stack'
          },
          {
            text: 'Contact',
            link: '/portfolio/#contact'
          }
        ],
        activeMatch: '/portfolio'
      },
      {
        text: 'Blog',
        link: '/blog/',
        activeMatch: '/blog'
      }
    ],
    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/lazarkulasevic/' },
      { icon: 'github', link: 'https://github.com/lazarkulasevic/' }
    ]
  },
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      links.push({
        url: pageData.relativePath.replace(/\.md$/, '.html'),
        lastmod: pageData.lastUpdated
      })
    }
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: 'https://lazarkulasevic.github.io/'
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((res) => writeStream.on('finish', res))
  }
}
