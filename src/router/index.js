import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "index" */ "@/components/index/Index.vue"),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "map" */ "@/components/map/InteractiveMaps.vue"),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ "@/components/users/UsersList.vue"),
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import(/* webpackChunkName: "clients" */  "@/components/clients/ClientsList.vue"),
  },
  {
    path: '/cars',
    name: 'Cars',
    component: () => import(/* webpackChunkName: "cars" */ "@/components/cars/CarsList.vue"),
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
      import(/* webpackChunkName: "ownreservations" */ "@/components/reservations/OwnReservationList.vue"),
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import(/* webpackChunkName: "payments" */ "@/components/payments/PaymentsList.vue"),
  },
  {
    path: '/ownpayments',
    name: 'OwnPayments',
    component: () => import(/* webpackChunkName: "ownpayments" */ "@/components/payments/OwnPaymentsList.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
