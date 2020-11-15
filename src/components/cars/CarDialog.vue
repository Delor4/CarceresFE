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
        id="input-group-plate"
        label="Rejestracja:"
        label-for="input-plate"
        description="Rejestracja"
      >
        <b-form-input
          id="input-plate"
          v-model="model.plate"
          type="text"
          required
          placeholder="Wpisz nr rejestracyjny"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-client"
        label="Klient:"
        label-for="input-client"
      >
        <b-form-select id="input-client" v-model="model.client_id" required>
          <b-form-select-option
            v-for="client in clients"
            v-bind:key="client.id"
            :value="client.id"
          >
            {{ client.name }} {{ client.surname }}
          </b-form-select-option>
        </b-form-select>
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
      clients: {},
      loading: false,
    };
  },
  computed: {
    modalTitle() {
      return `${this.model.id == -1 ? "Tworzenie" : "Edycja"} samochodu`;
    },
  },
  methods: {
    ok() {
      this.$emit("submit-edit", this.model);
      this.$bvModal.hide(this.modal_id);
    },
    async loadClients() {
      this.clients = await this.api.getAll(this.api.getClients);
    },
    async loadResources() {
      this.loading = true;

      await this.loadClients();

      this.loading = false;
    },
  },
  mounted() {
    this.loadResources();
  },
  props: ["model", "modal_id"],
};
</script>

<style scoped>
</style>