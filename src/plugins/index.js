/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import "@/scss/GlobalStyle.scss";


export function registerPlugins (app) {
  app.use(vuetify)
}
