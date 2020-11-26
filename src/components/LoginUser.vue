<template>
  <!--Logowanie-->
  <div class="user_login">
    <div class="input_forms_group">
      <b-form
        v-on:submit.prevent="login()"
        :hidden="auth.authorized"
        class="login_form"
      >
        <b-form-input
          type="text"
          v-model="name"
          placeholder="Login"
          class="login"
        />
        <b-form-input
          type="password"
          v-model="pass"
          placeholder="Hasło"
          class="pass"
        />
        <div class="login_btn">
          <b-button variant="success" @click="login()"> Zaloguj </b-button>
        </div>
      </b-form>
      <span :hidden="!auth.authorized" class="user_notify">
        <div>Witaj {{ user_name }}.</div>
        <div style="text-align: center">
          <router-link :to="{ path: '/settings' }">
            <b-icon-gear></b-icon-gear>
          </router-link>
        </div>
      </span>
    </div>
    <div class="login_btn">
      <b-button
        :hidden="!auth.authorized"
        variant="warning"
        @click="$emit('submit-logout')"
        >Wyloguj</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: "",
      pass: "",
    };
  },
  props: ["auth"],
  methods: {
    login() {
      this.$emit("submit-login-data", { name: this.name, pass: this.pass });
      this.pass = "";
    },
  },
  computed: {
    user_name() {
      return this.auth.user
        ? this.auth.user.client
          ? this.auth.user.client.name
          : this.auth.user.name
        : "Nieznajomy";
    },
  },
  mounted() {},
  components: {},
};
</script>

<style scoped>
</style>
