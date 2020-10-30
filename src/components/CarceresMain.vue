<template>
  <div class="carceres_main">
    <h1>Carceres</h1>
    <login-user
      :auth="api.auth"
      v-on:submit-login-data="on_login_user($event)"
      v-on:submit-logout="on_logout_user()"
    ></login-user>
    <interactive-maps></interactive-maps>
  </div>
</template>

<script>
import IMaps from "@/components/InteractiveMaps.vue";
import LoginUser from "@/components/LoginUser.vue";

export default {
  data: function () {
    return {
      info: null,
      loading: true,
      errored: false,
    };
  },
  methods: {
    on_login_user: function (data) {
      this.api.login(data.name, data.pass);
    },
    on_logout_user: function () {
      this.api.logout();
    },
  },
  mounted() {},
  components: {
    "interactive-maps": IMaps,
    "login-user": LoginUser,
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