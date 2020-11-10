<template>
  <div class="carceres_main">
    <h1>Carceres</h1>

    <!--Menu-->
    <carceres-nav
      :user="api.auth.user"
      :nav_cards="nav_cards"
      v-on:showed-card-change="onShowedCardChange($event)"
    ></carceres-nav>

    <!--Logowanie-->
    <div><login-user
      :auth="api.auth"
      v-on:submit-login-data="onLoginUser($event)"
      v-on:submit-logout="onLogoutUser()"
    ></login-user></div>

    <div ref="subcomponent">.</div>
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
        admin: () => import("@/components/admin/Admin.vue"),
        users_list: () => import("@/components/users/UsersList.vue"),
      },
      nav_cards: {
        1: [
          // ADMIN
          {
            name: "index",
            id: "index",
          },
          {
            name: "Mapa",
            id: "map",
          },
          {
            name: "Admin",
            id: "admin",
          },
          {
            name: "Użytkownicy",
            id: "users_list",
          },
        ],
        2: [
          // MOD
          {
            name: "index",
            id: "index",
          },
          {
            name: "Mapa",
            id: "map",
          },
        ],
        3: [
          // CLIENT
          {
            name: "index",
            id: "index",
          },
          {
            name: "Mapa",
            id: "map",
          },
        ],
        4: [
          // BOT
          {
            name: "index",
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
      if (!this.checkIdAaccessibility(id)) id = "index";
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
    this.setCard("index");
  },
  components: {
    "login-user": LoginUser,
    "carceres-nav": CarceresNav,
  },
};
</script>

<style>
.carceres_main {
  background-color: #202020;
  color: #e0e0e0;
  text-align: center;
}
</style>
