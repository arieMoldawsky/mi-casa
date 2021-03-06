import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../pages/home.cmp.vue';
import houseFilter from '../cmps/houseFilter.cmp.vue';
import houseApp from '../pages/houseApp.cmp.vue';
import about from '../pages/about.cmp.vue';
import houseDetails from '../pages/houseDetails.cmp.vue';
import userProfile from '../pages/userProfile.cmp.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: home,
  },
  {
    path: '/about',
    component: about
  },
  {
    path: '/house/:id',
    component: houseDetails
  },
  {
    path: '/house',
    component: houseApp
  },
  {
    path: '/house',
    component: houseFilter
  },
  {
    path: '/profile',
    component: userProfile
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
