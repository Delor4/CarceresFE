<template>
  <div class="carceres_list">
    <b-card-group deck>
      <b-card>
        <b-card-title>Użytkownicy</b-card-title>
        <b-card-sub-title>
          <b-button
            class="new_model"
            role="button"
            @click="onCreateModel"
            :class="{ 'd-none': !!dialogFormVisible }"
          >
            <b-icon-person-plus></b-icon-person-plus>
            Nowy
          </b-button>
        </b-card-sub-title>
        <user-dialog
          :model="formModel"
          :modal_id="modal_dialog_id"
          :user_types="user_types"
          v-on:cancel-edit="onCancelEdit()"
          v-on:submit-edit="onSubmitEdit($event)"
          v-on:hide-modal="resetDialog()"
          v-on:remove-model="onRemoveModel($event)"
        ></user-dialog>
        <b-list-group-item
          v-for="model in models"
          v-bind:key="model.id"
          class="users_list"
        >
          <span v-b-toggle="collapse_id(model.id)">
            <b-icon-caret-down class="when-open"></b-icon-caret-down>
            <b-icon-caret-right class="when-closed"></b-icon-caret-right>
            {{ model.name }}
          </span>
          <b-button variant="outline-secondary" @click="onEditModel(model.id)">Edycja</b-button>
          <b-collapse :id="collapse_id(model.id)">
            <b-card>
              Rola:
              {{ user_types.find((x) => x.value == model.user_type).text }}
            </b-card>
          </b-collapse>
        </b-list-group-item>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import UserDialog from "@/components/users/UserDialog.vue";

export default {
  components: {
    "user-dialog": UserDialog,
  },
  data: function () {
    return {
      models: {},
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_dialog_id: "user-dialog-modal",
      user_types: [
        { value: 1, text: "Administrator" },
        { value: 2, text: "Moderator" },
        { value: 3, text: "Klient" },
        { value: 4, text: "Bot" },
      ],
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
        password: "",
        user_type: 4,
      };
    },
    _cloneModel(model) {
      var _model = this._newModel();
      _model.id = model.id;
      _model.name = model.name;
      _model.password = model.password;
      _model.user_type = model.user_type;
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
      var created = await this.api.createUser(model);
      /* Add to list */
      this.models.push(created);
      this.loading = false;
      this.resetDialog();
    },
    async updateModel(model) {
      /* Send new data of user to api */
      var updated = await this.api.updateUser(model);
      /* Update list */
      var updatedIndex = this.models.map((item) => item.id).indexOf(model.id);
      ~updatedIndex && this.$set(this.models, updatedIndex, updated);
      this.loading = false;
      this.resetDialog();
    },
    async deleteModel(model_id) {
      /* removing from api */
      await this.api.deleteUser(model_id);
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
      this.models = await this.api.getAll(this.api.getUsers);
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
