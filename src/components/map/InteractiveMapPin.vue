<template>
  <div
    class="pin"
    :style="{
      position: 'absolute',
      left: '' + pin.pos_x + '%',
      top: '' + pin.pos_y + '%',
    }"
    role="button"
    :id="pin_id(pin.id)"
  >
    <img v-if="pin.occupied" src="pin_red.png" />
    <img v-else src="pin_green.png" />
    <b-tooltip :target="pin_id(pin.id)" variant="primary">
      <div>
        <strong>Miejsce nr: {{ this.pin.nr }}</strong>
      </div>
      <div v-if="pin.occupied">
        <div v-if="subscription != null">
          <div>Rezerwacja do:</div>
          <div>
            <strong>{{ convDate(subscription.end) }}</strong>
          </div>
          <div>
            Klient:
            <div>
              <strong>
                {{ subscription.car.client.name }}
                {{ subscription.car.client.surname }}
              </strong>
            </div>
          </div>
          <div v-if="subscription.car.brand">
            Samochód:
            <div>
              <strong>
                {{ subscription.car.brand }}
              </strong>
            </div>
          </div>
          <div>
            Numer rejestracyjny:
            <div>
              <strong>
                {{ subscription.car.plate }}
              </strong>
            </div>
          </div>
        </div>
        <strong v-else>Zajęte</strong>
      </div>
      <div v-else><strong>Wolne</strong></div>
    </b-tooltip>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      subscription: null,
    };
  },
  props: ["pin", "subscriptions"],
  watch: {
    subscriptions: "calcSubscription",
  },
  methods: {
    pin_id(id) {
      return "pin-" + id;
    },
    calcSubscription() {
      this.subscription = this.subscriptions
        ? this.subscriptions.find(
            (x) => x.place.occupied == true && x.place_id == this.pin.id
          )
        : null;
    },
  },
  mounted() {
    this.calcSubscription();
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
