import vue from 'vue';
import vueRouter from 'vue-router';
import home from '../pages/home.cmp.vue';
import about from '../pages/about.cmp.vue';

vue.use(vueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  }
]

const router = new vueRouter({
  routes
})

export default router
