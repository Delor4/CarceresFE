<template>

  <!--Logowanie-->
  <div class="user_login">
    <b-form v-on:submit.prevent="login()" :hidden="auth.authorized" class="login_form">
      <b-form-input type="text" v-model="name" placeholder="Login" class="login" />
      <b-form-input type="password" v-model="pass" placeholder="Hasło" class="pass" />
      <b-button pill variant="success" @click="login()" style="margin-top: 30px;"> Zaloguj </b-button>
    </b-form>
    <span :hidden="!auth.authorized">Witaj {{ user_name }}.</span>
    <b-button
      :hidden="!auth.authorized"
      pill variant="warning"
      @click="$emit('submit-logout')"
      >Wyloguj</b-button>
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
