import DefaultTheme from 'vitepress/theme'
import Profile from '../components/Profile.vue'
import HistoryTags from '../components/HistoryTags.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Profile', Profile)
    app.component('HistoryTags', HistoryTags)
  }
}
