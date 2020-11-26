<template>
  <div class="carceres_main">
    <header>
      <h1>Carceres</h1>
    </header>

    <!--Menu-->
    <carceres-nav
      :user="api.auth.user"
      :nav_links="nav_links"
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

    <div ref="subcomponent" class="container-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import LoginUser from "@/components/LoginUser.vue";
import CarceresNav from "@/components/CarceresNav.vue";

export default {
  data: function () {
    return {
      shared_data: {},
      nav_links: [
        {
          name: "Mapa",
          path: "/map",
          min_rights: 4,
        },
        {
          name: "Użytkownicy",
          path: "/users",
          min_rights: 1,
        },
        {
          name: "Klienci",
          path: "/clients",
          min_rights: 2,
        },
        {
          name: "Samochody",
          path: "/cars",
          min_rights: 2,
        },
        {
          name: "Rezerwacje",
          path: "/reservations",
          min_rights: 2,
        },
        {
          name: "Płatności",
          path: "/payments",
          min_rights: 2,
        },
        {
          name: "Moje rezerwacje",
          path: "/ownreservations",
          min_rights: 3,
        },
        {
          name: "Moje płatności",
          path: "/ownpayments",
          min_rights: 3,
        },
        {
          name: "Informacje",
          path: "/",
          min_rights: 4,
        },
      ],
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
      //this.setCard(this.showed_card);
    },
    onLogoutUser: function () {
      this.api.logout();
      //this.setCard(this.showed_card);
    },
    onShowedCardChange: function () {
      //this.setCard(id);
    },
  },
  mounted() {
    //this.setCard("map");
  },
  components: {
    "login-user": LoginUser,
    "carceres-nav": CarceresNav,
  },
};
</script>

<style>
</style>
