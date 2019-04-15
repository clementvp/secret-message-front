import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Retrieve from './views/Retrieve.vue'
import NotFound from './views/404.vue'
import Hiw from './views/Hiw.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: '404',
      component: NotFound
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:uid/:key',
      name: 'retrieve',
      component: Retrieve
    },
    {
      path: '/how_it_works',
      name: 'hiw',
      component: Hiw
    }
  ]
})
