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
          for_client: false,
        },
        {
          name: "Informacje",
          path: "/main",
          min_rights: 4,
          for_client: false,
        },

        {
          name: "Użytkownicy",
          path: "/users",
          min_rights: 1,
          for_client: false,
        },
        {
          name: "Klienci",
          path: "/clients",
          min_rights: 2,
          for_client: false,
        },
        {
          name: "Samochody",
          path: "/cars",
          min_rights: 2,
          for_client: false,
        },
        {
          name: "Rezerwacje",
          path: "/reservations",
          min_rights: 2,
          for_client: false,
        },
        {
          name: "Płatności",
          path: "/payments",
          min_rights: 2,
          for_client: false,
        },
        {
          name: "Moje rezerwacje",
          path: "/ownreservations",
          min_rights: 3,
          for_client: true,
        },
        {
          name: "Moje płatności",
          path: "/ownpayments",
          min_rights: 3,
          for_client: true,
        },
        {
          name: "Cennik",
          path: "/pricelist",
          min_rights: 4,
          for_client: false,
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
      const is_client = !!(this.user && this.user.client);
        
      return this.nav_links.filter(function (el) {
        return !(el.for_client && !is_client) && el.min_rights >= current_access_rights;
      });
    },
  },
};
</script>

<style>
</style>
