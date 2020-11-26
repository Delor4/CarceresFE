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
      var out = '<strong>Nr: ' + number
      var dane = this.subscriptions.results;
      var dataKonca;
      dane.map(dana => {
        let place = dana.place_id;
        if(place == number){
          dataKonca = dana.end
        }
      })    
      if(this.pin.occupied){
        return out + '</strong><br/>Zarezerowany do:<br/>' + '<strong>' + this.convDate(dataKonca) + '</strong>'
      }
      else{
        return out +  '<br/>Wolny</strong>'
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
