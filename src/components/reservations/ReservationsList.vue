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
        <reservations-dialog
          :model="formModel"
          :modal_id="modal_dialog_id"
          v-on:cancel-edit="onCancelEdit()"
          v-on:submit-edit="onSubmitEdit($event)"
          v-on:hide-modal="resetDialog()"
          v-on:remove-model="onRemoveModel($event)"
        ></reservations-dialog>
        <b-form-select v-model="filtered_client">
          <b-form-select-option :value="null"> Wszyscy </b-form-select-option>
          <b-form-select-option
            v-for="client in clients"
            v-bind:key="client.id"
            :value="client.id"
          >
            Rezerwacje: {{ client.name }} {{ client.surname }}
          </b-form-select-option>
        </b-form-select>
        <b-list-group-item
          v-for="model in filtered(models)"
          v-bind:key="model.id"
        >
          <span role="button" v-b-toggle="collapse_id(model.id)">
            <b-icon-caret-down class="when-open"></b-icon-caret-down>
            <b-icon-caret-right class="when-closed"></b-icon-caret-right>
            Miejsce: {{ model.place.zone.name }}/{{ model.place.nr }}, Samochód:
            {{ model.car.brand || "-" }} ({{ model.car.plate }}),
            Kwota:
            <span
              :class="{
                'subs-paid': model.payment && model.payment.paid,
                'subs-unpaid': !(model.payment && model.payment.paid),
              }"
            >
              {{
                model.payment ? formatCurrency(model.payment.value / 100) : "?"
              }}
              {{ "(netto: " + formatCurrency(model.payment.price / 100) + ")" }}
            </span>
          </span>
          <b-button
            v-if="
              model.payment && model.payment.paid && isDateInFuture(model.end)
            "
            title="Karta parkingowa"
            @click.prevent="onShowParkingCard(model)"
          >
            <b-icon-file-earmark-text></b-icon-file-earmark-text>
          </b-button>
          <router-link
            v-if="!(model.payment && model.payment.paid)"
            to="/payments"
          >
            <b-button variant="secondary">
              <b-icon-link></b-icon-link>
              Płatności
            </b-button>
          </router-link>
          <!--<b-button @click="onEditModel(model.id)">Edycja</b-button>-->
          <b-collapse :id="collapse_id(model.id)">
            <b-card>
              <div>
                Klient: {{ model.car.client.name }}
                {{ model.car.client.surname }}
              </div>
              <div>Start: {{ formatDateTime(model.start) }}</div>
              <div>Koniec: {{ formatDateTime(model.end) }}</div>
            </b-card>
          </b-collapse>
        </b-list-group-item>
      </b-card>
    </b-card-group>
    <parking-card ref="parking_card_pdf" :card="card"></parking-card>
  </div>
</template>

<script>
import ReservationsDialog from "@/components/reservations/ReservationsDialog.vue";
import ParkingCard from "@/components/reservations/ParkingCard.vue";

export default {
  components: {
    "reservations-dialog": ReservationsDialog,
    "parking-card": ParkingCard,
  },
  data: function () {
    return {
      errors: [],
      models: {},
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_dialog_id: "reservations-dialog-modal",
      clients: {},
      filtered_client: null,
      card: {
        subscription: {
          id: -1,
          car: {
            id: -1,
            plate: "",
          },
          place: {
            nr: -1,
            name: "",
            zone: {
              name: "",
            },
          },
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
    filtered: function (models) {
      if (this.filtered_client == null) return models;
      var self = this;
      return models.filter(function (model) {
        return model.car.client.id == self.filtered_client;
      });
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
    onCreateModel(place = -1) {
      this.formModel = this._newModel();
      this.formModel.place_id = place;
      this.dialogFormVisible = true;
      this.$bvModal.show(this.modal_dialog_id);
    },
    onEditModel() {
      /* TODO: implementing this */
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
      this.$refs.parking_card_pdf.generateReport();
    },
    validateModel(model) {
      model.start = null;
      if (!model.end) {
        this.err.showError("Błąd. Brak daty końca rezerwacji.");
        return false;
      }
      if (!this.isDateInFuture(model.end)) {
        this.err.showError("Błąd. Data poza dozwolonym zakresem.");
        return false;
      }
      model.end = new Date(Date.parse(model.end)).toISOString();
      return true;
    },
    async saveModel(model) {
      /* Send new client's data to api */
      if (this.validateModel(model)) {
        var created = await this.api.createSubscription(model);
        /* Add to list */
        this.models.push(created);
      }
      this.loading = false;
      this.resetDialog();
    },
    async updateModel() {
      /* TODO: implementing this */
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
      this.loading = true;
      this.clients = await this.api.getAll(this.api.getClients);
      var page = await this.api.getSubscriptions("desc(end)");
      this.models = await this.api.getRest(page);
      this.loading = false;
    },
    isDateInFuture(d) {
      return new Date(Date.parse(d)).getTime() - new Date().getTime() > 0;
    },
    checkRouting() {
      if(this.$route.params.place) {
        this.onCreateModel(this.$route.params.place);
      }
    },
  },
  mounted() {
    this.loadModels();
    this.resetDialog();
    this.checkRouting();
  },
  props: ["shared_data"],
};
</script>
<style scoped>
</style>
