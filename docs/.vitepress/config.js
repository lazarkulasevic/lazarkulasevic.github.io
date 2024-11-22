export default {
  lang: 'en-US',
  title: 'Lazar Kulasevic',
  description: 'Lazar Kulasevic is a Software Engineer based in Nis, Serbia.',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://lazarkulasevic.github.io',
    lastmodDateOnly: false
  },
  head: [
    ['meta', { property: 'author', content: 'Lazar Kulasevic' }],
    ['meta', { name: 'og:site_name', content: 'Lazar Kulasevic' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@else_clause' }],
    ['meta', { name: 'twitter:creator', content: '@else_clause' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }]
  ],
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    aside: true,
    outline: {
      level: 'deep'
    },
    nav: nav(),
    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/lazarkulasevic/' },
      { icon: 'github', link: 'https://github.com/lazarkulasevic/' }
    ]
  }
}

function nav() {
  return [
    {
      text: 'Portfolio',
      items: [
        {
          text: 'About Me',
          link: '/portfolio/#briefly-about-me'
        },
        {
          text: 'Work Experience',
          link: '/portfolio/#work-experience'
        },
        {
          text: 'Tech Stack',
          link: '/portfolio/#tech-stack'
        },
        {
          text: 'Get In Touch',
          link: '/portfolio/#get-in-touch'
        }
      ],
      activeMatch: '/portfolio'
    },
    {
      text: 'Blog',
      link: '/blog/',
      activeMatch: '/blog'
    }
  ]
}
