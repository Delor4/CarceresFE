<template>
  <b-modal
    :id="modal_id"
    :title="title"
    @backdrop="$emit('submit-edit', model)"
    @ok="$emit('submit-edit', model)"
    @hide="$emit('hide-modal', $event)"
  >
    <form v-on:submit.prevent="ok()">
      <div>Nazwa: <input v-model="model.name" /></div>
      <div>Hasło: <input v-model="model.password" /></div>
      <div>
        Rola:
        <b-form-select
          v-model="model.user_type"
          :options="user_types"
        ></b-form-select>
      </div>
    </form>
    <template #modal-footer="{ ok, cancel, hide }">
      <b-button
        :hidden="model.id == -1"
        variant="danger"
        @click="
          $emit('remove-model', model.id);
          hide();
        "
      >
        Usuń
      </b-button>
      <b-button variant="secondary" @click="cancel()"> Anuluj </b-button>
      <b-button variant="success" @click="ok()">
        {{ mode == "Edit" ? "Zapisz" : "Stwórz" }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  data: function () {
    return {
      user_types: [
        { value: "1", text: "Administrator" },
        { value: "2", text: "Moderator" },
        { value: "3", text: "Klient" },
        { value: "4", text: "Bot" },
      ],
    };
  },
  methods: {
    ok() {
      this.$emit("submit-edit", this.model);
      this.$bvModal.hide(this.modal_id);
    },
  },
  props: ["title", "mode", "model", "modal_id"],
};
</script>

<style scoped>
</style>