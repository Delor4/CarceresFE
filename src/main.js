import Vue from 'vue'
import Carceres from '@/components/CarceresMain.vue'
//import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
/* API */
import api from "./api";

Vue.mixin({
  data: function () {
    return {
      get api() {
        return api;
      }
    }
  }
})
new Vue({
  //router,
  store,
  render: h => h(Carceres),
}).$mount('#carceres')
