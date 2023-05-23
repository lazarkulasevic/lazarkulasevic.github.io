import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'

const links = []

export default {
    lang: 'en-US',
    title: 'Lazar Kulasevic',
    description: "Lazar Kulasevic's portfolio site.",
    head: [
        ['meta', { property: 'author', content: 'Lazar Kulasevic' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@else_clause' }],
        ['meta', { name: 'twitter:creator', content: '@else_clause' }]
    ],
    themeConfig: {
        nav: [
            {
                text: 'Portfolio',
                items: [
                    {
                        text: 'Intro',
                        link: '/portfolio/#intro'
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
                ]
            },
            {
                text: 'Blog',
                link: '/blog/'
            }
        ],
        socialLinks: [
            { icon: 'linkedin', link: 'https://www.linkedin.com/in/lazarkulasevic/' },
            { icon: 'github', link: 'https://github.com/lazarkulasevic/' }
        ]
    },
    markdown: {
        // options for markdown-it-anchor
        anchor: { permalink: false }
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
