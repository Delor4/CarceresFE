<template>
  <div class="carceres_main">
    <header>
      <h1>Carceres</h1>
    </header>

    <!--Menu-->
    <carceres-nav
      :user="api.auth.user"
      :nav_cards="nav_cards"
      v-on:showed-card-change="onShowedCardChange($event)"
    ></carceres-nav>

    <!--Logowanie-->
    <div>
      <login-user
        :auth="api.auth"
        v-on:submit-login-data="onLoginUser($event)"
        v-on:submit-logout="onLogoutUser()"
      ></login-user>
    </div>

    <div ref="subcomponent" class="container-wrapper">.</div>
  </div>
</template>

<script>
import Vue from "vue";
import LoginUser from "@/components/LoginUser.vue";
import CarceresNav from "@/components/CarceresNav.vue";

export default {
  data: function () {
    return {
      showed_card: "",
      shared_data: {},
      views: {
        index: () => import("@/components/index/Index.vue"),
        map: () => import("@/components/map/InteractiveMaps.vue"),
        users_list: () => import("@/components/users/UsersList.vue"),
        clients_list: () => import("@/components/clients/ClientsList.vue"),
        cars_list: () => import("@/components/cars/CarsList.vue"),
        reservations_own: () =>
          import("@/components/reservations/OwnReservationList.vue"),
        reservations_list: () =>
          import("@/components/reservations/ReservationsList.vue"),
        payments_own: () => import("@/components/payments/OwnPaymentsList.vue"),
        payments_list: () => import("@/components/payments/PaymentsList.vue"),
      },
      nav_cards: {
        1: [
          // ADMIN
          {
            name: "Mapa",
            id: "map",
          },
          {
            name: "Użytkownicy",
            id: "users_list",
          },
          {
            name: "Klienci",
            id: "clients_list",
          },
          {
            name: "Samochody",
            id: "cars_list",
          },
          {
            name: "Rezerwacje",
            id: "reservations_list",
          },
          {
            name: "Płatności",
            id: "payments_list",
          },
          {
            name: "Moje rezerwacje",
            id: "reservations_own",
          },
          {
            name: "Moje płatności",
            id: "payments_own",
          },
          {
            name: "Informacje",
            id: "index",
          },
        ],
        2: [
          // MOD
          {
            name: "Mapa",
            id: "map",
          },
          {
            name: "Klienci",
            id: "clients_list",
          },
          {
            name: "Samochody",
            id: "cars_list",
          },
          {
            name: "Rezerwacje",
            id: "reservations_list",
          },
          {
            name: "Płatności",
            id: "payments_list",
          },
          {
            name: "Moje rezerwacje",
            id: "reservations_own",
          },
          {
            name: "Moje płatności",
            id: "payments_own",
          },
          {
            name: "Informacje",
            id: "index",
          },
        ],
        3: [
          // CLIENT
          {
            name: "Mapa",
            id: "map",
          },
          {
            name: "Moje rezerwacje",
            id: "reservations_own",
          },
          {
            name: "Moje płatności",
            id: "payments_own",
          },
          {
            name: "Informacje",
            id: "index",
          },
        ],
        4: [
          // BOT
          {
            name: "Mapa",
            id: "map",
          },
          {
            name: "Informacje",
            id: "index",
          },
        ],
      },
    };
  },
  methods: {
    checkIdAaccessibility(id) {
      var current_access_rights = this.api.auth.user
        ? this.api.auth.user.user_type
        : 4;
      var ret = false;
      this.nav_cards[current_access_rights].forEach((card) => {
        if (id == card.id) ret = true;
      });
      return ret;
    },
    setCard: async function (id) {
      if (!this.checkIdAaccessibility(id)) id = "map";
      if (id === this.showed_card) return;

      this.showed_card = id;
      var comp = await this.views[this.showed_card]();
      var ComponentClass = Vue.extend(comp.default);
      var instance = new ComponentClass({
        propsData: { shared_data: this.shared_data },
      });
      instance.$mount();
      this.$refs.subcomponent.replaceChild(
        instance.$el,
        this.$refs.subcomponent.firstChild
      );
    },
    onLoginUser: function (data) {
      this.api.login(data.name, data.pass);
      this.setCard(this.showed_card);
    },
    onLogoutUser: function () {
      this.api.logout();
      this.setCard(this.showed_card);
    },
    onShowedCardChange: function (id) {
      this.setCard(id);
    },
  },
  mounted() {
    this.setCard("map");
  },
  components: {
    "login-user": LoginUser,
    "carceres-nav": CarceresNav,
  },
};
</script>

<style>
</style>
