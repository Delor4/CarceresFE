<template>
  <b-modal
    :id="modal_id"
    :title="modalTitle"
    @backdrop="$emit('submit-edit', model)"
    @ok="$emit('submit-edit', model)"
    @hide="$emit('hide-modal', $event)"
  >
    <b-form v-on:submit.prevent="ok()">
        <!-- TODO: fields -->
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
        Usuń
      </b-button>
      <b-button variant="secondary" @click="cancel()"> Anuluj </b-button>
      <b-button variant="success" @click="ok()">
        {{ model.id != -1 ? "Zapisz" : "Stwórz" }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  data: function () {
    return {
          };
  },
  computed: {
    modalTitle() {
      return `${this.model.id == -1 ? "Tworzenie" : "Edycja"} rezerwacji`;
    },
  },
  methods: {
    ok() {
      this.$emit("submit-edit", this.model);
      this.$bvModal.hide(this.modal_id);
    },
  },
  props: ["model", "modal_id"],
};
</script>

<style scoped>
</style>