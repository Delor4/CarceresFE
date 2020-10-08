<template>
  <div class="pin" 
    :style="{'position' : 'absolute', 'left' : '' + pin.pos[0] + '%', 'top': '' + pin.pos[1] + '%'}"
    role="button"
    v-on:click="$emit('occupy-change', pin.id)"
  >
    <img v-if="pin.occupied" src="pin_red.png"><img v-else src="pin_green.png">
  </div>
</template>

<script>

export default {
   data: function() {
        return {           
        };
    },
  props: ['pin'],
  methods: {
  },
  mounted () {
  },
  components: {
  },
};
</script>

<style scoped>
.pin img {
  height: auto;
  width: 5vw;
  max-width: 5vh;
}
</style>
