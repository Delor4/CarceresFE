<template>
  <div class="carceres_list">
    <b-card-group deck>
      <b-card class="payments_list">
        <b-card-title>Moje płatności</b-card-title>
        <own-payments-dialog
          :model="formModel"
          :modal_id="modal_dialog_id"
          v-on:cancel-edit="onCancelEdit()"
          v-on:submit-edit="onSubmitEdit($event)"
          v-on:hide-modal="resetDialog()"
          v-on:unpaid-model="onUnpaidModel($event)"
        ></own-payments-dialog>
        <b-list-group-item v-for="model in models" v-bind:key="model.id">
          <span v-b-toggle="collapse_id(model.id)" role="button">
            <b-icon-caret-down class="when-open"></b-icon-caret-down>
            <b-icon-caret-right class="when-closed"></b-icon-caret-right>
            Miejsce:
            {{ subscriptions[model.subscription_id].place.zone.name }}/{{
              subscriptions[model.subscription_id].place.nr
            }}
            <span
              :class="{
                'payment-paid': model.paid,
                'payment-unpaid': !model.paid,
              }"
            >
              {{ model.value / 100 + "zł" }}
              {{ "(netto: " + model.price / 100 + "zł)" }}
            </span>
          </span>
          <b-button
            v-if="model.paid"
            @click.prevent="onShowReceipt(model)"
            title="Paragon"
          >
            <b-icon-file-earmark-text></b-icon-file-earmark-text>
          </b-button>
          <b-button v-if="!model.paid" @click="onEditModel(model.id)">
            Zapłać
          </b-button>
          <b-collapse :id="collapse_id(model.id)">
            <b-card>
              <div>
                Samochód:
                {{ subscriptions[model.subscription_id].car.brand || "-" }}
                ({{ subscriptions[model.subscription_id].car.plate }})
              </div>
              <div>
                Start:
                {{ convDateTime(subscriptions[model.subscription_id].start) }}
              </div>
              <div>
                Koniec:
                {{ convDateTime(subscriptions[model.subscription_id].end) }}
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
import OwnPaymentsDialog from "@/components/payments/OwnPaymentsDialog.vue";
import PaymentReceipt from "@/components/payments/PaymentReceipt.vue";

export default {
  components: {
    "own-payments-dialog": OwnPaymentsDialog,
    "payment-receipt": PaymentReceipt,
  },
  data: function () {
    return {
      models: {},
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_dialog_id: "own-payments-dialog-modal",
      subscriptions: {},
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
    _newModel() {
      return {
        id: -1,
        paid_date: "",
        paid_type: 0,
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
      /* Not allowed. */
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
      this.receipt.subscription = await this.api.getOwnSubscription(
        model.subscription_id
      );
      /*this.receipt.car = await this.api.getOwnCar(
        this.receipt.subscription.car_id
      );*/
      this.receipt.client = this.api.auth.user.client;
      this.$refs.payment_pdf.generateReport();
    },
    async saveModel() {
      /* adding new - not possible */
      this.loading = false;
      this.resetDialog();
    },
    async updateModel(model) {
      /* Set online paid and update api */
      model.paid_type = 2;
      var updated = await this.api.updateOwnPayment(model);
      /* Update list */
      var updatedIndex = this.models.map((item) => item.id).indexOf(model.id);
      ~updatedIndex && this.$set(this.models, updatedIndex, updated);
      this.loading = false;
      this.resetDialog();
    },
    async unpaidModel() {
      /* Not allowed */
      this.loading = false;
      this.resetDialog();
    },
    resetDialog() {
      this.formModel = this._newModel();
      this.dialogFormVisible = false;
    },
    async loadModels() {
      var subscriptions = await this.api.getAll(this.api.getOwnSubscriptions);
      for (var subs of subscriptions) {
        this.subscriptions[subs.id] = subs;
      }
      var page = await this.api.getOwnPayments("paid_type");
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
:focus {
  outline: none;
}
</style>