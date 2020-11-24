<template>
  <div
    class="pin"
    :style="{
      position: 'absolute',
      left: '' + pin.pos_x + '%',
      top: '' + pin.pos_y + '%',
    }"
    role="button"
    v-b-tooltip.hover
    :title="'Nr: ' + pin.nr + (pin.name ? ' (' + pin.name + ')' : '')"
  >
    <img v-if="pin.occupied" src="pin_red.png" /><img
      v-else
      src="pin_green.png"
    />
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  props: ["pin"],
  methods: {},
  mounted() {},
  components: {},
};
</script>

<style scoped>
.pin img {
  height: auto;
  width: 5vw;
  max-width: 5vh;
}
</style>
