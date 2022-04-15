import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const routes = [
  { name: 'App', path: '/', component: App },
    // other routes
  // {
  //   path: '/',
  //   name: 'App',
  //   component: App,
  //   props: (route) => ({foo: route.query.foo})
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
