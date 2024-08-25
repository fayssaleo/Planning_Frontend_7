/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
// Components
import App from '@/components/App.vue'
import Store from './stores/index'
import Router from "./router/router"
// Composables
import { createApp } from 'vue'



const app = createApp(App)

registerPlugins(app)
app.use(Store)
app.use(Router)
app.use(VCalendar, {
  componentPrefix: "vc",
});
app.mount('#app')
