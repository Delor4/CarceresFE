<template>
  <div class="carceres_main">
    <h1>Carceres</h1>
    <interactive-maps></interactive-maps>
  </div>
</template>

<script>
import IMaps from '@/components/InteractiveMaps.vue'

export default {
   data: function() {
        return {
            info: null,
            loading: true,
            errored: false,
        }
    },
  methods: {
  },
  mounted () {
  },
  components: {
    'interactive-maps': IMaps,
  },
};
</script>

<style>
.carceres_main {
background-color: #202020;
color: #e0e0e0;
text-align: center 
}
</style>