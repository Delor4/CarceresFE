<template>
  <div class="carceres_list">
    <b-card-group deck>
      <b-card class="reservation_list">
        <b-card-title>Rezerwacje</b-card-title>
        <b-card-sub-title>
          <span
            role="button"
            @click="onCreateModel"
            :class="{ 'd-none': !!dialogFormVisible }"
          >
            <b-icon-plus-circle></b-icon-plus-circle>
            Nowy
          </span>
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
            <b-icon-caret-right></b-icon-caret-right>
            Miejsce: {{ model.place_id }} Samochód: {{ model.car_id }} Start:
            {{ model.start }} End: {{ model.end }} Typ: {{ model.type }}
          </span>
        </b-list-group-item>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import OwnReservationDialog from "@/components/reservation_own/OwnReservationDialog.vue";

export default {
  components: {
    "reservation-dialog": OwnReservationDialog,
  },
  data: function () {
    return {
      models: {},
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_dialog_id: "reservation-dialog-modal",
    };
  },
  methods: {
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