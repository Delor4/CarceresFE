<template>
  <div class="carceres_list">
    <b-card-group deck>
      <b-card class="cars_list">
        <b-card-title>Samochody</b-card-title>
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
        <car-dialog
          :model="formModel"
          :modal_id="modal_dialog_id"
          v-on:cancel-edit="onCancelEdit()"
          v-on:submit-edit="onSubmitEdit($event)"
          v-on:hide-modal="resetDialog()"
          v-on:remove-model="onRemoveModel($event)"
        ></car-dialog>
        <b-list-group-item v-for="model in models" v-bind:key="model.id">
          <span v-b-toggle="collapse_id(model.id)">
            <b-icon-caret-down class="when-open"></b-icon-caret-down>
            <b-icon-caret-right class="when-closed"></b-icon-caret-right>
          </span>
          <span role="button" @click.prevent="onEditModel(model.id)">
            {{ model.plate }}
          </span>
          <b-collapse :id="collapse_id(model.id)">
            <b-card> Marka: {{model.brand}} Klient: {{ model.client.name }} </b-card>
          </b-collapse>
        </b-list-group-item>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import CarDialog from "@/components/cars/CarDialog.vue";

export default {
  components: {
    "car-dialog": CarDialog,
  },
  data: function () {
    return {
      models: {},
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_dialog_id: "car-dialog-modal",
    };
  },
  methods: {
    collapse_id(id) {
      return "collapse-" + id;
    },
    _newModel() {
      return {
        id: -1,
        plate: "",
        brand: null,
        client_id: -1,
      };
    },
    _cloneModel(model) {
      var _model = this._newModel();
      _model.id = model.id;
      _model.plate = model.plate;
      _model.brand = model.brand;
      _model.client_id = model.client_id;
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
      /* Send new user's data to api */
      var created = await this.api.createCar(model);
      /* Add to list */
      this.models.push(created);
      this.loading = false;
      this.resetDialog();
    },
    async updateModel(model) {
      /* Send new data of user to api */
      var updated = await this.api.updateCar(model);
      /* Update list */
      var updatedIndex = this.models.map((item) => item.id).indexOf(model.id);
      ~updatedIndex && this.$set(this.models, updatedIndex, updated);
      this.loading = false;
      this.resetDialog();
    },
    async deleteModel(model_id) {
      /* removing from api */
      await this.api.deleteCar(model_id);
      /* removing from list */
      var removeIndex = this.models.map((item) => item.id).indexOf(model_id);
      ~removeIndex && this.models.splice(removeIndex, 1);
      this.loading = false;
    },
    resetDialog() {
      this.formModel = this._newModel();
      this.dialogFormVisible = false;
    },
    async loadModels() {
      this.models = await this.api.getAll(this.api.getCars);
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