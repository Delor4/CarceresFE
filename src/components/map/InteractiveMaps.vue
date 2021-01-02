<template>
  <div>
    <b-form-select v-model="curr_map" @change="updateMap()">
      <b-form-select-option :value="null" disabled>
        Wybierz strefę:
      </b-form-select-option>
      <b-form-select-option
        v-for="map in maps"
        v-bind:key="map.id"
        :value="map.id"
      >
        {{ map.name }}
      </b-form-select-option>
    </b-form-select>
    <interactive-map :map="map" :info="info"></interactive-map>
  </div>
</template>

<script>
import IMap from "@/components/map/InteractiveMap.vue";

export default {
  data: function () {
    return {
      curr_map: 1,
      maps: {},
      map: {},
      info: null,
    };
  },

  methods: {
    updateMap() {
      var self = this;
      this.map = this.maps.find(function (el) {
        return el.id == self.curr_map;
      });
    },
    async loadMaps() {
      this.maps = await this.api.getAll(this.api.getZones);
      this.updateMap();
      this.info = await this.api.getZoneInfo(this.map.id);
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
