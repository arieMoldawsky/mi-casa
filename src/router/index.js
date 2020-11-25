import vue from 'vue';
import vueRouter from 'vue-router';
import home from '../pages/home.cmp.vue';
import houseFilter from '../cmps/houseFilter.cmp.vue';
import about from '../pages/about.cmp.vue';

vue.use(vueRouter)

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/about',
    component: about
  },
  {
    path: '/house',
    component: houseFilter
  }
]

const router = new vueRouter({
  routes
})

export default router
