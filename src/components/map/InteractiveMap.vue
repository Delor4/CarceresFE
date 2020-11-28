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
    async loadData() {
      const self = this;
      const current_access_rights = this.getCurrentAccessRights();
      if (current_access_rights <= 2) {
        this.subscriptions = await this.api
          .getSubscriptions("desc(end)")
          .then(async (resp) => {
            return await self.api.getRest(resp);
          });
      } else if (current_access_rights == 3) {
        this.subscriptions = await this.api
          .getOwnSubscriptions("desc(end)")
          .then(async (resp) => {
            return await self.api.getRest(resp);
          });
      } else {
        this.subscriptions = null;
      }
    },
  },
  mounted() {
    this.loadData();
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
