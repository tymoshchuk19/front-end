import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GroupPage from '../views/GroupPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/groups',
    name: 'groups',
    component: GroupPage
  },
  {
    path: '/groups/:groups_id',
    name: 'groups',
    component: GroupPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
