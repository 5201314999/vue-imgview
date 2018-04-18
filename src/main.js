import Vue from 'vue'
import App from './App.vue'
import ImgView from './lib/index.js'
Vue.use(ImgView);
new Vue({
  el: '#app',
  render: h => h(App)
})
