import DefaultTheme from 'vitepress/theme'
import Team from './components/Team.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Team', Team)
  }
}