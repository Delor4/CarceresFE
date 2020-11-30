import Vue from 'vue'
import Carceres from '@/components/CarceresMain.vue'
import router from './router'
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
      get err() {
        return api.err;
      },
      currencyFormat: new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }),
      dateFormat: new Intl.DateTimeFormat('pl-PL'),
      dateTimeFormat: new Intl.DateTimeFormat('pl-PL', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
      }),
      timeFormat: new Intl.DateTimeFormat('pl-PL', { hour: 'numeric', minute: 'numeric', second: 'numeric', }),
    }
  },
  methods: {
    formatDate: function (d) {
      if (!d) return "";
      return this.dateFormat.format(new Date(d))
    },
    formatTime: function (d) {
      if (!d) return "";
      return this.timeFormat.format(new Date(d))
    },
    formatDateTime: function (d) {
      if (!d) return "";
      return this.dateTimeFormat.format(new Date(d))
    },
    formatCurrency(currency) {
      return this.currencyFormat.format(currency);
    },
    getCurrentAccessRights() {
      return this.api.auth.user ? this.api.auth.user.user_type : 4;
    },
  }
})
new Vue({
  router,
  store,
  render: h => h(Carceres),
}).$mount('#carceres')
