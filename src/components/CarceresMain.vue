<template>
  <div class="carceres_main">
    <h1>Carceres</h1>
    <login-user
      :auth="api.auth"
      v-on:submit-login-data="on_login_user($event)"
      v-on:submit-logout="on_logout_user()"
    ></login-user>
    <carceres-nav
      :user="api.auth.user"
      :nav_cards="nav_cards"
      v-on:showed-card-change="on_showed_card_change($event)"
    ></carceres-nav>
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
    check_id_accessibility(id) {
      var current_access_rights = this.api.auth.user
        ? this.api.auth.user.user_type
        : 4;
      var ret = false;
      this.nav_cards[current_access_rights].forEach((card) => {
        if (id == card.id) ret = true;
      });
      return ret;
    },
    set_card: async function (id) {
      if (!this.check_id_accessibility(id)) id = "index";
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
    on_login_user: function (data) {
      this.api.login(data.name, data.pass);
      this.set_card(this.showed_card);
    },
    on_logout_user: function () {
      this.api.logout();
      this.set_card(this.showed_card);
    },
    on_showed_card_change: function (id) {
      this.set_card(id);
    },
  },
  mounted() {
    this.set_card("index");
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
