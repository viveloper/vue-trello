import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'

import store from '../store'

Vue.use(VueRouter);

const checkAuth = (to, from, next) => {
  store.state.token ? next() : next('/login')
}

const routes = [
  { path: '/', component: Home, beforeEnter: checkAuth },
  {
    path: '/b/:bid', component: Board, beforeEnter: checkAuth, children: [
      { path: 'c/:cid', component: Card }
    ]
  },
  { path: '/login', component: Login, beforeEnter: (to, from, next) => { store.state.token ? next('/') : next() } },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router