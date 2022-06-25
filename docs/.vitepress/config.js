export default {
    lang: 'en-US',
    title: 'Lazar Kulasevic',
    description: 'Lazar Kulasevic\'s portfolio site.',
    head: [
        ['meta', { property: 'og:description', content: 'description' }],
    ],
    themeConfig: {
        nav: [
            {
                text: 'Portfolio',
                items: [
                    {
                        items: [
                            {
                                text: 'Intro',
                                link: '/portfolio/#intro',
                                activeMatch: '/portfolio/#intro'
                            },
                            {
                                text: 'Tech Stack',
                                link: '/portfolio/#tech-stack',
                                activeMatch: '/portfolio/#tech-stack'
                            },
                            {
                                text: 'Projects',
                                link: '/portfolio/#projects',
                                activeMatch: '/portfolio/#projects'
                            },
                            {
                                text: 'Contact',
                                link: '/portfolio/#contact',
                                activeMatch: '/portfolio/#contact'
                            }
                        ]
                    }
                ]
            },
        ],
        socialLinks: [
            { icon: 'linkedin', link: 'https://www.linkedin.com/in/lazarkulasevic/' }
        ],
        // sidebar: {
        //     '/portfolio/': [
        //         {
        //             text: 'Navigation',
        //             items: [
        //                 { text: 'Portfolio', link: '/portfolio/' },
        //                 { text: 'Intro', link: '/portfolio/#intro' },
        //                 { text: 'Tech Stack', link: '/portfolio/#tech-stack' }
        //             ]
        //         }
        //     ],
        // },
        footer: {
            message: 'Thank you for visiting my website!',
            copyright: '© 2022 - Lazar Kulasevic'
        }
    },
    markdown: {
        // options for markdown-it-anchor
        // anchor: { permalink: true },

        // options for markdown-it-toc
        toc: { includeLevel: [1, 2] }
    }
}
