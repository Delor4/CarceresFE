<template>
  <div>
    <form v-on:submit.prevent="login()" :hidden="authorized">
      Name: <input v-model="name" /> Pass: <input v-model="pass" />
      <b-button variant="success" @click="login()"> Login </b-button>
    </form>
    <b-button
      :hidden="!authorized"
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
  props: ["authorized"],
  methods: {
    login() {
      this.$emit("submit-login-data", { name: this.name, pass: this.pass });
      this.pass = "";
    },
  },
  mounted() {},
  components: {},
};
</script>

<style scoped>
</style>
