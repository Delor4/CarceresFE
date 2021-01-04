import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: () => import(/* webpackChunkName: "common" */ "@/components/index/Index.vue"),
  },
  {
    path: '/',
    redirect: '/main',
    name: 'Home',
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "common" */ "@/components/map/InteractiveMaps.vue"),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "clients" */ "@/components/users/UsersList.vue"),
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import(/* webpackChunkName: "clients" */  "@/components/clients/ClientsList.vue"),
  },
  {
    path: '/cars',
    name: 'Cars',
    component: () => import(/* webpackChunkName: "clients" */ "@/components/cars/CarsList.vue"),
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: () =>
      import(/* webpackChunkName: "reservations" */ "@/components/reservations/ReservationsList.vue"),
  },
  {
    path: '/ownreservations',
    name: 'OwnReservations',
    component: () =>
      import(/* webpackChunkName: "reservations" */ "@/components/reservations/OwnReservationList.vue"),
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import(/* webpackChunkName: "reservations" */ "@/components/payments/PaymentsList.vue"),
  },
  {
    path: '/ownpayments',
    name: 'OwnPayments',
    component: () => import(/* webpackChunkName: "reservations" */ "@/components/payments/OwnPaymentsList.vue"),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "clients" */ "@/components/settings/Settings.vue"),
  },
  {
    path: '/pricelist',
    name: 'PriceList',
    component: () => import(/* webpackChunkName: "common" */ "@/components/pricelist/PriceList.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
