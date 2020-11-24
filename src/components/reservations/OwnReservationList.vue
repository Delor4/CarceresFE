<template>
  <div class="carceres_list">
    <b-card-group deck>
      <b-card class="reservation_list">
        <b-card-title>Rezerwacje</b-card-title>
        <b-card-sub-title>
          <b-button
            role="button"
            class="new_model"
            @click="onCreateModel"
            :class="{ 'd-none': !!dialogFormVisible }"
          >
            <b-icon-plus-circle></b-icon-plus-circle>
            Nowy
          </b-button>
        </b-card-sub-title>
        <reservation-dialog
          :model="formModel"
          :modal_id="modal_dialog_id"
          v-on:cancel-edit="onCancelEdit()"
          v-on:submit-edit="onSubmitEdit($event)"
          v-on:hide-modal="resetDialog()"
          v-on:remove-model="onRemoveModel($event)"
        ></reservation-dialog>
        <b-list-group-item v-for="model in models" v-bind:key="model.id">
          <span role="button" @click.prevent="onEditModel(model.id)">
            <span v-b-toggle="collapse_id(model.id)">
              <b-icon-caret-down class="when-open"></b-icon-caret-down>
              <b-icon-caret-right class="when-closed"></b-icon-caret-right>
            </span>
            Miejsce: {{ model.place.zone.name }}/{{ model.place.nr }}, Samochód:
            {{ model.car.brand || "-" }} ({{ model.car.plate }}),
            <span :class="{ 'd-none': model.payment && model.payment.paid }">
              Do zapłaty
              {{
                model.payment ? "" + model.payment.value / 100 + "zł" : "(?)"
              }}
              {{ "(netto: " + model.payment.price / 100 + "zł)" }}
            </span>
          </span>
          <span
            v-if="
              model.payment && model.payment.paid && isDateInFuture(model.end)
            "
            role="button"
            @click.prevent="onShowParkingCard(model)"
          >
            <b-icon-file-earmark-text></b-icon-file-earmark-text>
          </span>
          <b-collapse :id="collapse_id(model.id)">
            <b-card>
              <div>Start: {{ convDateTime(model.start) }}</div>
              <div>Koniec: {{ convDateTime(model.end) }}</div>
            </b-card>
          </b-collapse>
        </b-list-group-item>
      </b-card>
    </b-card-group>
    <parking-card ref="parking_card_pdf" :card="card"></parking-card>
  </div>
</template>

<script>
import OwnReservationDialog from "@/components/reservations/OwnReservationDialog.vue";
import ParkingCard from "@/components/reservations/ParkingCard.vue";

export default {
  components: {
    "reservation-dialog": OwnReservationDialog,
    "parking-card": ParkingCard,
  },
  data: function () {
    return {
      models: {},
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_dialog_id: "reservation-dialog-modal",
      card: {
        subscription: {
          id: -1,
        },
        car: {
          id: -1,
          plate: "",
        },
        place: {
          nr: -1,
          name: "",
        },
        zone: {
          name: "",
        },
      },
    };
  },
  methods: {
    collapse_id(id) {
      return "collapse-" + id;
    },
    _newModel() {
      return {
        id: -1,
        start: "",
        end: "",
        type: 1,
        car_id: -1,
        place_id: -1,
      };
    },
    _cloneModel(model) {
      var _model = this._newModel();
      _model.id = model.id;
      _model.start = model.start;
      _model.end = model.end;
      _model.type = model.type;
      _model.car_id = model.car_id;
      _model.place_id = model.place_id;
      return _model;
    },
    onCreateModel() {
      this.formModel = this._newModel();
      this.dialogFormVisible = true;
      this.$bvModal.show(this.modal_dialog_id);
    },
    onEditModel() {
      /* edit not possible */
      // TODO: show msg to user
    },
    onRemoveModel(model_id) {
      this.loading = true;
      this.deleteModel(model_id);
    },
    onCancelEdit() {
      this.resetDialog();
    },
    onSubmitEdit(model) {
      this.loading = true;
      if (model.id != -1) this.updateModel(model);
      else this.saveModel(model);
    },
    async onShowParkingCard(model) {
      this.card.subscription = model;
      this.card.car = await this.api.getOwnCar(this.card.subscription.car_id);
      this.card.client = this.api.auth.user.client;
      this.card.place = await this.api.getPlace(
        this.card.subscription.place_id
      );
      this.card.zone = await this.api.getZone(this.card.place.zone_id);
      this.$refs.parking_card_pdf.generateReport();
    },
    async saveModel(model) {
      /* Send new client's data to api */
      model.start = null;
      model.end = new Date(Date.parse(model.end)).toISOString();
      var created = await this.api.createOwnSubscription(model);
      /* Add to list */
      this.models.push(created);
      this.loading = false;
      this.resetDialog();
    },
    async updateModel() {
      /* updating not possible */
      this.loading = false;
      this.resetDialog();
    },
    async deleteModel() {
      /* removing not possible */
      this.loading = false;
    },
    resetDialog() {
      this.formModel = this._newModel();
      this.dialogFormVisible = false;
    },
    async loadModels() {
      var page = await this.api.getOwnSubscriptions();
      var pages = page.results;
      while (page.hasNext()) {
        page = await this.api.getNext(page);
        pages.push(...page.results);
      }
      this.models = pages;

      this.loading = false;
    },
    isDateInFuture(d) {
      return new Date(Date.parse(d)).getTime() - new Date().getTime() > 0;
    },
  },
  mounted() {
    this.loading = true;
    this.loadModels();
    this.resetDialog();
  },

  props: ["shared_data"],
};
</script>
<style scoped>
</style>