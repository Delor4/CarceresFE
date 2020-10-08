<template>
  <div>
    Hello from interactive Map {{ map.name }}!!!
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
import IPin from '@/components/InteractiveMapPin.vue'

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
}
.map-zone-img
{
  width: 100%; 
  height: auto
}
</style>