import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import Vuetify from 'vuetify/lib'
import Chartkick from 'vue-chartkick'
import chartjs from 'chart.js'

Vue.use(Chartkick.use(chartjs))
// import 'bootstrap' //

var STORAGE_KEY = 'todos-vuejs-2.0'
Vue.config.productionTip = false
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

new Vue({
  todoStorage,
  router,
  Vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
