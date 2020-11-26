<template>
  <div
    class="pin"
    :style="{
      position: 'absolute',
      left: '' + pin.pos_x + '%',
      top: '' + pin.pos_y + '%',
    }"
    role="button"
    v-b-tooltip.hover.html="{ variant: 'primary'}"
    :title= "tooltipText(this.pin.nr)"
    
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
    return {
    };
  },
  props: ["pin","subscriptions"],
  methods: {
    tooltipText(number){
      if(this.pin.occupied){
        return '<strong>Nr: ' + number + '</strong><br/>Zarezerowany do:<br/>' + '<strong>' + this.convDate(this.subscriptions.end) + '</strong>'

      }
      else{
        return '<strong>Nr: ' + number + '<br/>Wolny</strong>'
      }
    },
  },
  mounted() {
    
  },
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
