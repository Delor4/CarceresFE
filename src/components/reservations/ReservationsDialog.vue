<template>
  <b-modal
    :id="modal_id"
    :title="modalTitle"
    @backdrop="ok()"
    @ok="ok()"
    @hide="$emit('hide-modal', $event)"
    @show="onShow()"
  >
    <b-form v-on:submit.prevent="ok()">
      <b-form-group
        id="input-group-car"
        label="Samochód:"
        label-for="input-car"
      >
        <b-form-select id="input-car" v-model="model.car_id" required>
          <b-form-select-option-group
            v-for="client in clients"
            v-bind:key="client.id"
            :label="client.name"
          >
            <b-form-select-option
              v-for="car in client.cars"
              v-bind:key="car.id"
              :value="car.id"
            >
              {{car.brand}} ({{ car.plate }})
            </b-form-select-option>
          </b-form-select-option-group>
        </b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-place"
        label="Miejsce:"
        label-for="input-place"
      >
        <b-form-select id="input-place" v-model="model.place_id" required>
          <b-form-select-option :value="null" disabled>
            Wybierz miejsce:
          </b-form-select-option>
          <b-form-select-option-group
            v-for="zone in zones"
            v-bind:key="zone.id"
            :label="zone.name"
          >
            <b-form-select-option
              v-for="place in zone.places"
              v-bind:key="place.id"
              :value="place.id"
              :disabled="place.occupied"
            >
              Miejsce nr {{ place.nr }} {{ place.name }}
              {{ place.occupied ? "(niedostępne)" : "" }}
            </b-form-select-option>
          </b-form-select-option-group>
        </b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-datetime"
        label="Rezerwacja do:"
        label-for="input-enddate"
      >
        <datetime
          id="input-enddate"
          format="YYYY-MM-DD H:i"
          width="300px"
          v-model="model.end"
        ></datetime>
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel, hide }">
      <b-button
        :hidden="model.id == -1"
        variant="danger"
        @click="
          $emit('remove-model', model.id);
          hide();
        "
      >
        Usuń
      </b-button>
      <b-button variant="secondary" @click="cancel()"> Anuluj </b-button>
      <b-button variant="success" @click="ok()">
        {{ model.id != -1 ? "Zapisz" : "Stwórz" }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import datetime from "vuejs-datetimepicker";

export default {
  components: { datetime },
  data: function () {
    return {
      zones: {},
      clients: {},
      loading: false,
    };
  },
  computed: {
    modalTitle() {
      return `${this.model.id == -1 ? "Tworzenie" : "Edycja"} rezerwacji`;
    },
  },
  methods: {
    ok() {
      this.$emit("submit-edit", this.model);
      this.$bvModal.hide(this.modal_id);
    },
    async onShow() {
      await this.loadPlaces();
    },
    async loadClients() {
      this.clients = await this.api.getAll(this.api.getClients);
    },
    async loadPlaces() {
      this.zones = await this.api.getAll(this.api.getZones);
    },
    async loadResources() {
      this.loading = true;

      await this.loadClients();

      this.loading = false;
    },
  },
  mounted() {
    this.loadResources();
  },
  props: ["model", "modal_id"],
};
</script>

<style scoped>
</style>