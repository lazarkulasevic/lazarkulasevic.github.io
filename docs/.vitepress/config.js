export default {
    lang: 'en-US',
    title: 'Lazar Kulasevic',
    description: 'Lazar Kulasevic\'s portfolio site.',
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
        anchor: { permalink: true }
    }
}
