<template>
  <nav>
    <router-link
      v-for="(card, index) in allowed_nav_links"
      v-bind:key="index"
      :to="card.path"
      class="nav-item"
      role="button"
    >
      {{ card.name }}
    </router-link>
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
  props: ["user", "nav_links"],
  computed: {
    allowed_nav_links() {
      const current_access_rights = this.user ? this.user.user_type : 4;
      return this.nav_links.filter(function (el) {
        return el.min_rights >= current_access_rights;
      });
    },
  },
};
</script>

<style>
</style>
