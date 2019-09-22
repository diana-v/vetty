import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Chartkick from 'vue-chartkick'
import chartjs from 'chart.js'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(Chartkick.use(chartjs))

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
