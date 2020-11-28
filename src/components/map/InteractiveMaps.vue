<template>
  <div>
    <interactive-map
      :map="map"
      v-on:zone-change="onZoneChange()"
    ></interactive-map>
  </div>
</template>

<script>
import IMap from "@/components/map/InteractiveMap.vue";

export default {
  data: function () {
    return {
      curr_map: 0,
      maps: {},
      map: {},
    };
  },

  methods: {
    onZoneChange() {
      this.curr_map++;
      if (this.curr_map >= this.maps.length) {
        this.curr_map = 0;
      }
      this.map = this.maps[this.curr_map];
    },

    async loadMaps() {
      this.maps = await this.api.getAll(this.api.getZones);
      this.map = this.maps[this.curr_map];
    },
  },

  mounted() {
    this.loadMaps();
  },
  components: {
    "interactive-map": IMap,
  },
};
</script>
