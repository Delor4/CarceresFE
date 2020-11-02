<template>
  <nav>
    <ul class="nav nav-tabs nav-justified" style="margin-bottom: 10px;">
      <li class="nav-item"
        v-for="(card, index) in nav_cards[current_access_rights]"
        v-bind:key="index"
        @click="$emit('showed-card-change', card.id)"
      >
        {{ card.name }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {},
  mounted() {},
  components: {},
  props: ["user", "nav_cards"],
  computed: {
    current_access_rights() {
      var current_access_rights = this.user ? this.user.user_type : 4;
      return current_access_rights;
    },
  },
};
</script>

<style>
</style>
