<template>
  <div
    class="pin"
    :style="{
      position: 'absolute',
      left: '' + pin.pos_x + '%',
      top: '' + pin.pos_y + '%',
    }"
    role="button"
    v-b-tooltip.hover.html="{ variant: 'primary' }"
    :title="tooltipText(this.pin.nr)"
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
  props: ["pin", "subscriptions"],
  methods: {
    tooltipText(number) {
      var out = "<strong>Nr: " + number + "</strong>";

      const subscription = this.subscriptions
        ? this.subscriptions.results.find(
            (x) => x.place.occupied == true && x.place_id == this.pin.id
          )
        : null;
      if (subscription != null) {
        let endDate = this.convDate(subscription.end);
        let clientData =
          subscription.car.client.name + " " + subscription.car.client.surname;
        let carData = subscription.car.brand;
        let carPlates = subscription.car.plate;
        if (endDate != null) {
          out += "<br/>Rezerowacja do:<br/>" + "<strong>" + endDate;
        }
        if (clientData != null) {
          out += "<br/></strong>Klient: <strong><br/>" + clientData;
        }
        if (carData != null) {
          out += "<br/></strong>Samochód: <strong><br/>" + carData;
        }
        if (carPlates != null) {
          out += "<br/></strong>Numer rejestracyjny: <strong><br/>" + carPlates;
        }
        return out;
      } else {
        if (this.pin.occupied) {
          return (out += "<strong><br/>Zajęte</strong>");
        }
        return (out += "<strong><br/>Wolne</strong>");
      }
    },
  },
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
