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
      intlCurrencyFormat: new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }),
      intlDateFormat: new Intl.DateTimeFormat('pl-PL'),
      intlDateTimeFormat: new Intl.DateTimeFormat('pl-PL', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
      }),
      intlTimeFormat: new Intl.DateTimeFormat('pl-PL', { hour: 'numeric', minute: 'numeric', second: 'numeric', }),
      price_by_days: [
        [365, 1800],
        [182, 1000],
        [28, 22 * 9],
        [7, 6 * 9],
        [1, 9],
      ],
    }
  },
  methods: {
    calcPriceByDays(days) {
      var currDay = null
      for (currDay of this.price_by_days) {
        if (days >= currDay[0])
          return Math.floor(days / currDay[0]) * currDay[1];
      }
      return currDay[1];
    },
    calcReservationPrice(end_date, start_date = new Date()) {
      console.log(end_date)
      const diff = Math.floor((end_date - start_date) / 1000 / 60 / 60 / 24);
      return diff >= 0 ? this.calcPriceByDays(diff) * 100 : -1;
    },
    calcTax() {
      return 23;
    },
    formatDate: function (d) {
      if (!d) return "";
      return this.intlDateFormat.format(new Date(d))
    },
    formatTime: function (d) {
      if (!d) return "";
      return this.intlTimeFormat.format(new Date(d))
    },
    formatDateTime: function (d) {
      if (!d) return "";
      return this.intlDateTimeFormat.format(new Date(d))
    },
    formatCurrency(currency) {
      return this.intlCurrencyFormat.format(currency);
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
