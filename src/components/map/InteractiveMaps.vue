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
      timer_update_map: null,
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
    setTimer: function () {
      this.timer_update_map = setInterval(
        async function () {
          var info = await this.api.getZoneInfo(this.map.id);
          // check for last changes on map
          // TODO: check some timestamp (not value)
          if (info.free != this.info.free) {
            this.loadMaps();
          } else {
            this.info = info;
          }
        }.bind(this),
        60000
      );
    },
  },

  mounted() {
    this.loadMaps();
    this.setTimer();
  },
  beforeDestroy() {
    clearInterval(this.timer_update_map);
  },
  components: {
    "interactive-map": IMap,
  },
};
</script>
