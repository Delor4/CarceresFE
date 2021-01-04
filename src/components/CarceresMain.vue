<template>
  <div class="carceres_main">
    <header>
      <img src="/logo_carceres.png" class="main_logo" />
      <h1>Carceres</h1>
    </header>

    <!--Menu-->
    <carceres-nav :user="api.auth.user"></carceres-nav>

    <!--Logowanie-->
    <div>
      <login-user
        :auth="api.auth"
        v-on:submit-login-data="onLoginUser($event)"
        v-on:submit-logout="onLogoutUser()"
      ></login-user>
    </div>

    <div ref="subcomponent" class="container-wrapper">
      <errors></errors>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LoginUser from "@/components/LoginUser.vue";
import CarceresNav from "@/components/CarceresNav.vue";
import Errors from "@/components/common/Errors.vue";

export default {
  data: function () {
    return {};
  },
  methods: {
    onLoginUser: function (data) {
      this.api.login(data.name, data.pass);
      if (this.$route.path !== "/" && this.$route.path !== "/main") {
        this.$router.push("/");
      }
    },
    onLogoutUser: function () {
      this.api.logout();
      if (this.$route.path !== "/" && this.$route.path !== "/main") {
        this.$router.push("/");
      }
    },
  },
  mounted() {},
  components: {
    "login-user": LoginUser,
    "carceres-nav": CarceresNav,
    errors: Errors,
  },
};
</script>

<style>
</style>
