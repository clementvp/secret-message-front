import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import '@fortawesome/fontawesome-free-solid'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
fontawesome.library.add(brands)
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(Buefy)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
