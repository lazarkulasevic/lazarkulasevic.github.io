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
                                text: 'Projects',
                                link: '/portfolio/#projects',
                                activeMatch: '/portfolio/#projects'
                            },
                            {
                                text: 'Tech Stack',
                                link: '/portfolio/#tech-stack',
                                activeMatch: '/portfolio/#tech-stack'
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
            { icon: 'linkedin', link: 'https://www.linkedin.com/in/lazarkulasevic/' },
            { icon: 'github', link: 'https://github.com/lazarkulasevic/' }
        ]
    },
    markdown: {
        // options for markdown-it-anchor
        anchor: { permalink: true }
    }
}
