<template>
  <div class="content">
    <h2 role="button" v-on:click="$emit('zone-change')">{{ map.name }}</h2>
  <div class="map-zone"><img class="map-zone-img" :src="map.bkg_file">
    <interactive-map-pin
          v-for="(pin) in map.places"
          v-bind:key="pin.id"
          v-bind:pin="pin"
          v-on:occupy-change="$emit('occupy-change', $event)"
    ></interactive-map-pin>
  </div>
  </div>
</template>

<script>
import IPin from '@/components/map/InteractiveMapPin.vue'

export default {
   data: function() {
        return {

        };
    },
  props: ['map'],
  methods: {
  },
  mounted () {
  },
  components: {
    'interactive-map-pin': IPin,
  },
};
</script>

<style>
.map-zone
{
  position: relative;
  /*background-color: aqua;*/
  max-width: 100vh;
  display: block;
  margin-left: auto;
  margin-right: auto
}
.map-zone-img
{
  width: 100%;
  height: auto
}
</style>
