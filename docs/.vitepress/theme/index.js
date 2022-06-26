import DefaultTheme from 'vitepress/theme'
import CustomLayout from './CustomLayout.vue'
import './custom.css'

export default {
    ...DefaultTheme,
    Layout: CustomLayout
}
