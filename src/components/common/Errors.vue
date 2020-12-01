<template>
  <div class="errors">
    <b-alert
      v-for="(error, index) in err.getErrors()"
      :key="index"
      dismissible
      fade
      :variant="error.variant"
      :show="error.elapsedTime"
    >
      {{ error.msg }}
    </b-alert>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {},
  mounted() {},
  components: {},
};
</script>

<style scoped>
.errors {
  min-height: initial;
}
</style>