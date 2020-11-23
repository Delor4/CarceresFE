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
      },
    }
  },
  methods: {
    convDate: function (d) {
      if (!d) return "";
      d = new Date(d);
      const offset = d.getTimezoneOffset();
      var newDate = new Date(d.getTime() - offset * 60 * 1000);
      return newDate.toISOString().split("T")[0];
    },
    convTime: function (d) {
      if (!d) return "";
      d = new Date(d);
      const offset = d.getTimezoneOffset();
      var newDate = new Date(d.getTime() - offset * 60 * 1000);
      return newDate.toISOString().split("T")[1].split(".")[0];
    },
    convDateTime: function (d) {
      if (!d) return "";
      d = new Date(d);
      const offset = d.getTimezoneOffset();
      var newDate = new Date(d.getTime() - offset * 60 * 1000);
      var newD = newDate.toISOString().split("T");
      return newD[0] + ' ' + newD[1].split(".")[0]
    },
  }
})
new Vue({
  //router,
  store,
  render: h => h(Carceres),
}).$mount('#carceres')
