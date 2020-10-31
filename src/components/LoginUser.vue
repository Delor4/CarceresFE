<template>
  <div>
    <form v-on:submit.prevent="login()" :hidden="auth.authorized">
      Name: <input v-model="name" /> Pass: <input v-model="pass" />
      <b-button variant="success" @click="login()"> Login </b-button>
    </form>
    <span :hidden="!auth.authorized">Witaj {{ user_name }}.</span>
    <b-button
      :hidden="!auth.authorized"
      variant="warning"
      @click="$emit('submit-logout')"
      >Logout</b-button
    >
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
