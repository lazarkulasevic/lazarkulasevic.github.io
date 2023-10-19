const giscusConfig = (currentTheme) => ({
  async: true,
  src: 'https://giscus.app/client.js',
  'data-repo': 'lazarkulasevic/lazarkulasevic.github.io',
  'data-repo-id': 'MDEwOlJlcG9zaXRvcnkyOTUwMDExNjY=',
  'data-category': 'General',
  'data-category-id': 'DIC_kwDOEZVcTs4CQt8M',
  'data-mapping': 'pathname',
  'data-strict': '0',
  'data-reactions-enabled': '1',
  'data-emit-metadata': '0',
  'data-input-position': 'top',
  'data-theme': currentTheme,
  'data-lang': 'en',
  'data-loading': 'lazy',
  crossorigin: 'anonymous'
})

export { giscusConfig }
