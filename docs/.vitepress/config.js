export default {
  lang: 'en-US',
  title: 'deploy & pray',
  description:
    'Deploy and Pray started as a joke — but in reality, it’s the story of every engineer. My work is about turning those desperate prayers into confidence: solid code, smart strategy, and solutions that last.',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://deployandpray.com',
    lastmodDateOnly: false
  },
  head: [
    ['meta', { property: 'author', content: 'Lazar Kulasevic' }],
    ['meta', { name: 'og:site_name', content: 'Lazar Kulasevic' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // ['meta', { name: 'twitter:site', content: '@else_clause' }],
    // ['meta', { name: 'twitter:creator', content: '@else_clause' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }],
    [
      'script',
      { src: '//gc.zgo.at/count.js', 'data-goatcounter': 'https://deployandpray.goatcounter.com/count', async: true }
    ],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Lazar Kulasevic',
        jobTitle: 'Software Engineer',
        description:
          'Frontend-specialized Software Engineer with 5+ years of experience. TypeScript/React/Next.js/Vue. Currently at Symphony.is working on an AI-powered platform for managing real-estate for homeowners and uses AI daily. Experience with microfrontends and shared packages in a fashion retail & apparel system. Open to Software Engineer roles and frontend-leaning Full-Stack roles.',
        url: 'https://deployandpray.com',
        sameAs: [
          'https://www.linkedin.com/in/lazarkulasevic/',
          'https://github.com/lazarkulasevic'
        ],
        knowsAbout: [
          'TypeScript', 'JavaScript', 'React', 'Next.js', 'Vue', 'Node.js',
          'Express', 'TipTap', 'SignalR', 'CSS', 'SCSS', 'HTML', 'Vite',
          'Webpack', 'Vitest', 'Jest', 'Cypress', 'Docker', 'GitHub Actions',
          'Cloud Firestore', 'Redux', 'Jotai', 'Zod',
          'Microfrontends', 'SSR', 'CI/CD', 'Firebase', 'Google Cloud Platform'
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Symphony.is',
          url: 'https://symphony.is'
        },
        alumniOf: {
          '@type': 'Organization',
          name: 'Wiser Technology (ex Badin Soft)',
          url: 'https://wisertech.com/'
        },
        knowsLanguage: ['en', 'sr'],
        nationality: 'Serbian'
      })
    ]
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
