<template>
  <div class="carceres_main">
    <header>
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
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LoginUser from "@/components/LoginUser.vue";
import CarceresNav from "@/components/CarceresNav.vue";

export default {
  data: function () {
    return {};
  },
  methods: {
    onLoginUser: function (data) {
      this.api.login(data.name, data.pass);
      this.$router.push({ path: "/" });
    },
    onLogoutUser: function () {
      this.api.logout();
      this.$router.push({ path: "/" });
    },
  },
  mounted() {},
  components: {
    "login-user": LoginUser,
    "carceres-nav": CarceresNav,
  },
};
</script>

<style>
</style>
