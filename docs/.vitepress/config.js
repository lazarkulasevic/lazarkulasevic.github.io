export default {
    lang: 'en-US',
    title: 'Lazar Kulasevic',
    description: 'Lazar Kulasevic\'s portfolio site.',
    head: [
        ['meta', { property: 'og:title', content: 'Lazar Kulasevic' }],
        ['meta', { property: 'keywords', content: 'Lazar Kulasevic, JavaScript, Frontend Developer' }],
        ['meta', { property: 'og:url', content: 'https://lazarkulasevic.github.io' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:image', content: '/featured.png' }],
        ['meta', { property: 'author', content: 'Lazar Kulasevic' }],

        ['meta', { property: 'twitter:title', content: 'Lazar Kulasevic' }],
        ['meta', { property: 'twitter:description', content: 'Lazar Kulasevic\'s portfolio site.' }],
        ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { property: 'twitter:creator', content: '@else_clause' }],
        ['meta', { property: 'twitter:image', content: '/featured.png' }]
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
        ],
        socialLinks: [
            { icon: 'linkedin', link: 'https://www.linkedin.com/in/lazarkulasevic/' },
            { icon: 'github', link: 'https://github.com/lazarkulasevic/' }
        ]
    },
    markdown: {
        // options for markdown-it-anchor
        anchor: { permalink: true }
    }
}
