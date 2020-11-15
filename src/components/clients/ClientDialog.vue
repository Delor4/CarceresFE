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
        id="input-group-name"
        label="Imię:"
        label-for="input-name"
        description="Imię"
      >
        <b-form-input
          id="input-name"
          v-model="model.name"
          type="text"
          required
          placeholder="Wpisz imię"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-surname"
        label="Nazwisko:"
        label-for="input-surname"
        description="Nazwisko"
      >
        <b-form-input
          id="input-surname"
          v-model="model.surname"
          type="text"
          required
          placeholder="Wpisz nazwisko"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-address"
        label="Adres:"
        label-for="input-address"
        description="Adres"
      >
        <b-form-input
          id="input-address"
          v-model="model.address"
          type="text"
          required
          placeholder="Wpisz adres"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-city"
        label="Miasto:"
        label-for="input-city"
        description="Miasto"
      >
        <b-form-input
          id="input-city"
          v-model="model.city"
          type="text"
          required
          placeholder="Wpisz miasto"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-phone"
        label="Telefon:"
        label-for="input-phone"
        description="Telefon"
      >
        <b-form-input
          id="input-phone"
          v-model="model.phone"
          type="text"
          required
          placeholder="Wpisz telefon"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-user"
        label="Konto internetowe:"
        label-for="input-user"
      >
        <b-form-select id="input-user" v-model="model.user_id" required>
          <b-form-select-option :value="null">
            Brak konta on-line
          </b-form-select-option>
          <b-form-select-option
            v-for="user in users"
            v-bind:key="user.id"
            :value="user.id"
            :disabled="user.client != null && model.id != user.client.id"
          >
            {{ user.name }}
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
      users: {},
      loading: false,
    };
  },
  computed: {
    modalTitle() {
      return `${this.model.id == -1 ? "Tworzenie" : "Edycja"} klienta`;
    },
  },
  methods: {
    ok() {
      this.$emit("submit-edit", this.model);
      this.$bvModal.hide(this.modal_id);
    },
    async loadUsers() {
      this.users = await this.api.getAll(this.api.getUsers);
    },
    async loadResources() {
      this.loading = true;

      await this.loadUsers();

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