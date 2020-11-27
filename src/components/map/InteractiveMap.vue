<template>
  <div>
    <h2 role="button" v-on:click="$emit('zone-change')">{{ map.name }}</h2>
    <div class="map-zone">
      <img class="map-zone-img" :src="map.bkg_file" />
      <interactive-map-pin
        v-for="pin in map.places"
        v-bind:key="pin.id"
        v-bind:pin="pin"
        v-bind:subscriptions="subscriptions"
      ></interactive-map-pin>
    </div>
  </div>
</template>

<script>
import IPin from "@/components/map/InteractiveMapPin.vue";

export default {
  data: function () {
    return {
      subscriptions: null,
    };
  },
  props: ["map"],
  methods: {
    checkUserRights() {
      var current_access_rights = this.api.auth.user
        ? this.api.auth.user.user_type
        : 4;
      return current_access_rights;
    },
    async loadData(id) {
      if (id == 1 || id == 2) {
        this.subscriptions = await this.api.getSubscriptions("desc(end)");
      }
      if (id == 3) {
        this.subscriptions = await this.api.getOwnSubscriptions("desc(end)");
      }
      if (id == 4) {
        this.subscriptions = null;
      }
    },
  },
  mounted() {
    var id = this.checkUserRights();
    this.loadData(id);
  },
  components: {
    "interactive-map-pin": IPin,
  },
};
</script>

<style>
.map-zone {
  position: relative;
  max-width: 100vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.map-zone-img {
  width: 100%;
  height: auto;
}
</style>
