<template>
  <b-modal
    :id="modal_id"
    :title="modalTitle"
    @backdrop="$emit('submit-edit', model)"
    @ok="$emit('submit-edit', model)"
    @hide="$emit('hide-modal', $event)"
  >
    <b-form v-on:submit.prevent="ok()">
      <b-form-group
        id="input-group-login"
        label="Login:"
        label-for="input-login"
        description="Nazwa użytkownika"
      >
        <b-form-input
          id="input-login"
          v-model="model.name"
          type="text"
          required
          placeholder="Wpisz login"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-pass"
        label="Hasło:"
        label-for="input-pass"
        description="Hasło"
      >
        <b-form-input
          id="input-pass"
          v-model="model.password"
          type="password"
          required
          placeholder="Wpisz hasło"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-role" label="Rola:" label-for="input-role">
        <b-form-select
          id="input-role"
          v-model="model.user_type"
          :options="user_types"
          required
        ></b-form-select>
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel, hide }">
      <b-button
        :hidden="model.id == -1"
        variant="danger"
        @click="
          $emit('remove-model', model.id);
          hide();
        "
      >
        <b-icon-person-x></b-icon-person-x> Usuń
      </b-button>
      <b-button variant="secondary" @click="cancel()"> Anuluj </b-button>
      <b-button variant="success" @click="ok()">
        <b-icon-person-plus v-if="model.id == -1"></b-icon-person-plus>
        <b-icon-person-check v-if="model.id != -1"></b-icon-person-check>
        {{ model.id != -1 ? "Zapisz" : "Stwórz" }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  computed: {
    modalTitle() {
      return `${this.model.id == -1 ? "Tworzenie" : "Edycja"} użytkownika`;
    },
  },
  methods: {
    ok() {
      this.$emit("submit-edit", this.model);
      this.$bvModal.hide(this.modal_id);
    },
  },
  props: ["model", "modal_id", "user_types"],
};
</script>

<style scoped>
</style>