import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import Vuetify from 'vuetify/lib'
// import 'bootstrap' //

Vue.config.productionTip = false

new Vue({
  router,
  Vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
