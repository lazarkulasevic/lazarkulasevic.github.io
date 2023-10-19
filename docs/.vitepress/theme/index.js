import DefaultTheme from 'vitepress/theme'
import CustomLayout from './CustomLayout.vue'
import Utils from '../utils/Utils'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.config.globalProperties.Utils = Utils
  }
}
