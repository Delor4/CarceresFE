<template>
  <div>
    <interactive-map
      :map="map"
      :info="info"
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
      info: null,
    };
  },

  methods: {
    async onZoneChange() {
      this.curr_map++;
      if (this.curr_map >= this.maps.length) {
        this.curr_map = 0;
      }
      this.map = this.maps[this.curr_map];
      this.info = await this.api.getZoneInfo(this.map.id)
    },

    async loadMaps() {
      this.maps = await this.api.getAll(this.api.getZones);
      this.map = this.maps[this.curr_map];
      this.info = await this.api.getZoneInfo(this.map.id)
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
