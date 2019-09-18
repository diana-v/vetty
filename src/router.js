import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/board',
      name: 'board',
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Board.vue')
      }
    },
    {
      path: '/client',
      name: 'client',
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Client.vue')
      }
    },
    {
      path: '/specialist',
      name: 'specialist',
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Specialist.vue')
      }
    },
    {
      path: '/reception',
      name: 'reception',
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Reception.vue')
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Statistics.vue')
      }
    }
  ]
})
