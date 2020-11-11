<template>
  <div>
    <interactive-map
      :map="map"
      v-on:occupy-change="onOccupyChange($event)"
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
    onOccupyChange(id) {
      this.map.places[id].occupied = !this.map.places[id].occupied;
    },

    onZoneChange() {
      this.maps[this.curr_map] = this.map;
      var next_curr = -1;
      var get_next = false;
      for (var i in this.maps) {
        if (get_next) {
          next_curr = i;
          get_next = false;
          break;
        }
        if (i == this.curr_map) {
          get_next = true;
        }
      }
      if (next_curr == -1) next_curr = 1;

      this.curr_map = next_curr;
      this.map = this.maps[this.curr_map];
    },

    async loadMaps() {
      var zones = await this.api.getZones();
      this.maps = zones.results;
      while (zones.hasNext()) {
        zones = await this.api.getNext(zones);
        this.maps.push(...zones.results);
      }
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
