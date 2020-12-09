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
    return {
      nav_links: [
        {
          name: "Mapa",
          path: "/map",
          min_rights: 4,
        },
        {
          name: "Informacje",
          path: "/main",
          min_rights: 4,
        },

        {
          name: "Użytkownicy",
          path: "/users",
          min_rights: 1,
        },
        {
          name: "Klienci",
          path: "/clients",
          min_rights: 2,
        },
        {
          name: "Samochody",
          path: "/cars",
          min_rights: 2,
        },
        {
          name: "Rezerwacje",
          path: "/reservations",
          min_rights: 2,
        },
        {
          name: "Płatności",
          path: "/payments",
          min_rights: 2,
        },
        {
          name: "Moje rezerwacje",
          path: "/ownreservations",
          min_rights: 3,
        },
        {
          name: "Moje płatności",
          path: "/ownpayments",
          min_rights: 3,
        },
        {
          name: "Cennik",
          path: "/pricelist",
          min_rights: 4,
        },
      ],
    };
  },
  methods: {},
  mounted() {},
  components: {},
  props: ["user"],
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
