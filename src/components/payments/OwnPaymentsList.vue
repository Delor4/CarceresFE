<template>
  <div class="carceres_list">
    <b-card-group deck>
      <b-card class="payments_list">
        <b-card-title>Płatności</b-card-title>
        <own-payments-dialog
          :model="formModel"
          :modal_id="modal_dialog_id"
          v-on:cancel-edit="onCancelEdit()"
          v-on:submit-edit="onSubmitEdit($event)"
          v-on:hide-modal="resetDialog()"
          v-on:unpaid-model="onUnpaidModel($event)"
        ></own-payments-dialog>
        <b-list-group-item v-for="model in models" v-bind:key="model.id">
          <span
            role="button"
            @click.prevent="onEditModel(model.id)"
            :class="{
              'payment-paid': model.paid,
              'payment-unpaid': !model.paid,
            }"
          >
            <b-icon-caret-right></b-icon-caret-right>
            Miejsce: {{ subscriptions[model.subscription_id].place_id }} Samochód: {{ subscriptions[model.subscription_id].car_id }}
            Start: {{ subscriptions[model.subscription_id].start }} End: {{ subscriptions[model.subscription_id].end }}
            {{ model.value / 100 + "zł" }} {{ "(netto: " + model.price / 100 + "zł)" }}
          </span>
        </b-list-group-item>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import OwnPaymentsDialog from "@/components/payments/OwnPaymentsDialog.vue";

export default {
  components: {
    "own-payments-dialog": OwnPaymentsDialog,
  },
  data: function () {
    return {
      models: {},
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_dialog_id: "own-payments-dialog-modal",
      subscriptions: {},
    };
  },
  methods: {
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
      for(var subs of subscriptions){
          this.subscriptions[subs.id] = subs
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
.payment-paid {
  background-color: greenyellow;
}
.payment-unpaid {
  background-color: #f77;
}
</style>