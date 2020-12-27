<template>
  <div class="carceres_list">
    <b-card-group deck>
      <b-card class="clients_list">
        <b-card-title>Klienci</b-card-title>
        <b-card-sub-title>
          <b-button
            role="button"
            class="new_model"
            @click="onCreateModel"
            :class="{ 'd-none': !!dialogFormVisible }"
          >
            <b-icon-person-plus></b-icon-person-plus>
            Nowy
          </b-button>
        </b-card-sub-title>
        <client-dialog
          :model="formModel"
          :modal_id="modal_dialog_id"
          v-on:cancel-edit="onCancelEdit()"
          v-on:submit-edit="onSubmitEdit($event)"
          v-on:hide-modal="resetDialog()"
          v-on:remove-model="onRemoveModel($event)"
        ></client-dialog>
        <b-list-group-item v-for="model in models" v-bind:key="model.id">
          <span v-b-toggle="collapse_id(model.id)">
            <b-icon-caret-down class="when-open"></b-icon-caret-down>
            <b-icon-caret-right class="when-closed"></b-icon-caret-right>
            {{ model.name }} {{ model.surname }}
          </span>
          <b-button @click="onEditModel(model.id)">Edycja</b-button>
          <b-collapse :id="collapse_id(model.id)">
            <b-card>
              Adres: {{ model.address || "-" }} Miasto:
              {{ model.city || "-" }} Tel: {{ model.phone || "(Brak)" }}
            </b-card>
          </b-collapse>
        </b-list-group-item>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import ClientDialog from "@/components/clients/ClientDialog.vue";

export default {
  components: {
    "client-dialog": ClientDialog,
  },
  data: function () {
    return {
      models: {},
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_dialog_id: "client-dialog-modal",
    };
  },
  methods: {
    collapse_id(id) {
      return "collapse-" + id;
    },
    _newModel() {
      return {
        id: -1,
        name: "",
        surname: "",
        address: "",
        phone: "",
        user_id: null,
      };
    },
    _cloneModel(model) {
      var _model = this._newModel();
      _model.id = model.id;
      _model.name = model.name;
      _model.surname = model.surname;
      _model.address = model.address;
      _model.phone = model.phone;
      _model.user_id = model.user_id;
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
      var created = await this.api.createClient(model);
      /* Add to list */
      this.models.push(created);
      this.loading = false;
      this.resetDialog();
    },
    async updateModel(model) {
      /* Send new data of user to api */
      var updated = await this.api.updateClient(model);
      /* Update list */
      var updatedIndex = this.models.map((item) => item.id).indexOf(model.id);
      ~updatedIndex && this.$set(this.models, updatedIndex, updated);
      this.loading = false;
      this.resetDialog();
    },
    async deleteModel(model_id) {
      /* removing from api */
      await this.api.deleteClient(model_id);
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
      this.models = await this.api.getAll(this.api.getClients);
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