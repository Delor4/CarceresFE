<template>
  <div>
    <b-card-group deck>
      <b-card class="users_list">
        <b-card-title>Użytkownicy</b-card-title>
        <b-card-sub-title>
          <span
            role="button"
            @click="on_create_model"
            :class="{ 'd-none': dialogFormVisible != false }"
          >
            <b-icon-plus-circle></b-icon-plus-circle>
            Nowy
          </span>
        </b-card-sub-title>
        <user-dialog
          :title="modalTitle"
          :mode="mode"
          :model="formModel"
          :modal_id="modal_id"
          v-on:cancel-edit="on_cancel_edit()"
          v-on:submit-edit="on_submit_edit($event)"
          v-on:hide-modal="reset_dialog()"
          v-on:remove-model="on_remove_model($event)"
        ></user-dialog>
        <b-list-group-item v-for="model in models" v-bind:key="model.id">
          <span role="button" @click.prevent="on_edit_model(model.id)">
            <b-icon-caret-right></b-icon-caret-right>
            {{ model.name }}
          </span>
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
      mode: "",
      dialogFormVisible: false,
      loading: false,
      formModel: {},
      modal_id: "user-dialog-modal",
    };
  },
  computed: {
    modalTitle() {
      return `${this.mode == "Create" ? "Tworzenie" : "Edycja"} użytkownika`;
    },
  },
  methods: {
    _new_model() {
      return {
        id: -1,
        name: "",
        password: "",
        user_type: 4,
      };
    },
    clone_model(model) {
      var _model = this._new_model();
      _model.id = model.id;
      _model.name = model.name;
      _model.password = model.password;
      _model.user_type = model.user_type;
      return _model;
    },
    on_create_model() {
      this.mode = "Create";
      this.formModel = this._new_model();
      this.dialogFormVisible = true;
      this.$bvModal.show(this.modal_id);
    },
    on_edit_model(model_id) {
      this.mode = "Edit";
      this.formModel = this.clone_model(
        this.models.find((x) => x.id === model_id)
      );
      this.dialogFormVisible = true;
      this.$bvModal.show(this.modal_id);
    },
    on_remove_model(model_id) {
      this.delete_model(model_id);
    },
    on_cancel_edit() {
      this.reset_dialog();
    },
    on_submit_edit(model) {
      if (this.mode == "Edit") this.update_model(model);
      else this.save_model(model);
      this.reset_dialog();
    },
    async save_model(model) {
      console.log("creating user:", model);
      /* Send new user's data to api */
      var created = await this.api.createUser(model);
      console.log("created:", created);
      /* Add to list */
      this.models.push(created);
    },
    async update_model(model) {
      console.log("updating user:", model);
      /* Send new data of user to api */
      var updated = await this.api.updateUser(model);
      console.log("updated:", updated);
      /* Update list */
      var updatedIndex = this.models.map((item) => item.id).indexOf(model.id);
      ~updatedIndex && (this.models[updatedIndex] = updated);
    },
    async delete_model(model_id) {
      console.log("deleting user:", model_id);
      /* removing from api */
      await this.api.deleteUser(model_id);
      console.log("user deleted");
      /* removing from list */
      var removeIndex = this.models.map((item) => item.id).indexOf(model_id);
      ~removeIndex && this.models.splice(removeIndex, 1);
    },
    reset_dialog() {
      this.mode = "";
      this.dialogFormVisible = false;
      this.loading = false;
    },
    async load_models() {
      this.models = await this.api.getAll(this.api.getUsers);
    },
  },
  mounted() {
    this.reset_dialog();
    this.formModel = this._new_model();
    this.load_models();
  },

  props: ["shared_data"],
};
</script>
<style scoped>
</style>