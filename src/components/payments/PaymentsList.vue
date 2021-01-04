<template>
  <div class="carceres_list">
    <b-card-group deck>
      <b-card class="payments_list">
        <b-card-title>Płatności</b-card-title>
        <payments-dialog
          :model="formModel"
          :modal_id="modal_dialog_id"
          v-on:cancel-edit="onCancelEdit()"
          v-on:submit-edit="onSubmitEdit($event)"
          v-on:hide-modal="resetDialog()"
          v-on:unpaid-model="onUnpaidModel($event)"
        ></payments-dialog>
        <b-form-select v-model="filtered_client">
          <b-form-select-option :value="null"> Wszyscy </b-form-select-option>
          <b-form-select-option
            v-for="client in clients"
            v-bind:key="client.id"
            :value="client.id"
          >
            Płatności: {{ client.name }} {{ client.surname }}
          </b-form-select-option>
        </b-form-select>
        <b-list-group-item
          v-for="model in filtered(models)"
          v-bind:key="model.id"
        >
          <span v-b-toggle="collapse_id(model.id)" role="button">
            <b-icon-caret-down class="when-open"></b-icon-caret-down>
            <b-icon-caret-right class="when-closed"></b-icon-caret-right>
            <span
              >Miejsce:
              {{ subscriptions[model.subscription_id].place.zone.name }}/{{
                subscriptions[model.subscription_id].place.nr
              }},
            </span>
            <span
              >Samochód:
              {{ subscriptions[model.subscription_id].car.brand || "-" }}
              ({{ subscriptions[model.subscription_id].car.plate }}),
            </span>
            Kwota:
            <span
              :class="{
                'payment-paid': model.paid,
                'payment-unpaid': !model.paid,
              }"
            >
              {{ formatCurrency(model.value / 100) }}
              (netto: {{ formatCurrency(model.price / 100) }})
            </span>
          </span>
          <b-button
            v-if="model.paid"
            @click.prevent="onShowReceipt(model)"
            title="Paragon"
          >
            <b-icon-file-earmark-text></b-icon-file-earmark-text>
          </b-button>
          <b-button variant="outline-secondary" @click="onEditModel(model.id)">Edycja</b-button>
          <b-collapse :id="collapse_id(model.id)">
            <b-card>
              <div>
                Klient:
                {{ subscriptions[model.subscription_id].car.client.name }} {{ subscriptions[model.subscription_id].car.client.surname }}
              </div>
              <div>
                Start:
                {{ formatDateTime(subscriptions[model.subscription_id].start) }}
              </div>
              <div>
                Koniec:
                {{ formatDateTime(subscriptions[model.subscription_id].end) }}
              </div>
            </b-card>
          </b-collapse>
        </b-list-group-item>
      </b-card>
    </b-card-group>
    <payment-receipt ref="payment_pdf" :receipt="receipt"></payment-receipt>
  </div>
</template>

<script>
import PaymentsDialog from "@/components/payments/PaymentsDialog.vue";
import PaymentReceipt from "@/components/payments/PaymentReceipt.vue";

export default {
  components: {
    "payments-dialog": PaymentsDialog,
    "payment-receipt": PaymentReceipt,
  },
  data: function () {
    return {
      models: {},
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_dialog_id: "payments-dialog-modal",
      subscriptions: {},
      clients: {},
      filtered_client: null,
      receipt: {
        payment: {
          price: -1,
          tax: -1,
          value: -1,
        },
        subscription: {},
        car: {},
        client: {},
      },
    };
  },
  methods: {
    collapse_id(id) {
      return "collapse-" + id;
    },
    filtered: function (models) {
      if (this.filtered_client == null) return models;
      var self = this;
      return models.filter(function (model) {
        return (
          self.subscriptions[model.subscription_id] &&
          self.subscriptions[model.subscription_id].car.client.id ==
            self.filtered_client
        );
      });
    },
    _newModel() {
      return {
        id: -1,
        paid_date: "",
        paid_type: 0,
        paid: false,
        price: 0,
        value: 0,
        sale_date: "",
        subscription_id: -1,
        tax: 0,
      };
    },
    _cloneModel(model) {
      var _model = this._newModel();
      _model.id = model.id;
      _model.paid_date = model.paid_date;
      _model.paid_type = model.paid_type;
      _model.paid = model.paid;
      _model.price = model.price;
      _model.value = model.value;
      _model.sale_date = model.sale_date;
      _model.subscription_id = model.subscription_id;
      _model.tax = model.tax;
      return _model;
    },
    onCreateModel() {
      this.formModel = this._newModel();
      this.dialogFormVisible = true;
      this.$bvModal.show(this.modal_dialog_id);
    },
    onEditModel(model_id) {
      this.formModel = this._cloneModel(
        this.models.find((x) => x.id === model_id)
      );
      this.dialogFormVisible = true;
      this.$bvModal.show(this.modal_dialog_id);
    },
    onUnpaidModel(model) {
      this.loading = true;
      this.unpaidModel(model);
    },
    onCancelEdit() {
      this.resetDialog();
    },
    onSubmitEdit(model) {
      this.loading = true;
      if (model.id != -1) this.updateModel(model);
      else this.saveModel(model);
    },
    async onShowReceipt(model) {
      this.receipt.payment = model;
      this.receipt.subscription = await this.api.getSubscription(
        model.subscription_id
      );
      this.$refs.payment_pdf.generateReport();
    },
    async saveModel() {
      /* adding new - not possible */
      this.loading = false;
      this.resetDialog();
    },
    async updateModel(model) {
      /* Set direct paid and update api */
      model.paid_type = 1;
      var updated = await this.api.updatePayment(model);
      /* Update list */
      var updatedIndex = this.models.map((item) => item.id).indexOf(model.id);
      ~updatedIndex && this.$set(this.models, updatedIndex, updated);
      this.loading = false;
      this.resetDialog();
    },
    async unpaidModel(model) {
      /* Set not paid and update api */
      model.paid_type = 0;
      model.paid_date = null;
      var updated = await this.api.updatePayment(model);
      /* Update list */
      var updatedIndex = this.models.map((item) => item.id).indexOf(model.id);
      ~updatedIndex && this.$set(this.models, updatedIndex, updated);
      this.loading = false;
      this.resetDialog();
    },
    resetDialog() {
      this.formModel = this._newModel();
      this.dialogFormVisible = false;
    },
    async loadModels() {
      this.clients = await this.api.getAll(this.api.getClients);
      var subscriptions = await this.api.getAll(this.api.getSubscriptions);
      for (var subs of subscriptions) {
        this.subscriptions[subs.id] = subs;
      }
      var page = await this.api.getPayments("paid_type");
      this.models = await this.api.getRest(page);
      this.loading = false;
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