<template>
  <b-modal
    :id="modal_id"
    :title="modalTitle"
    @backdrop="ok()"
    @ok="ok()"
    @hide="$emit('hide-modal', $event)"
    @show="onShow()"
  >
    <b-form v-on:submit.prevent="ok()">
      <p>Netto: {{model.price/100}}zł</p>
      <p>Podatek: {{model.tax}}%</p>
      <p>Brutto: {{model.value/100}}zł</p>
      <p>Tu powinna być integracja z płatnościami online ale w demonstracyjnej aplikacji wystarczy że klikniesz przycisk 'Opłać'.</p>
    </b-form>
    <template #modal-footer="{ ok, cancel }">
      <b-button variant="secondary" @click="cancel()"> Anuluj </b-button>
      <b-button variant="success" @click="ok()">
        {{ model.id != -1 ? "Opłać" : "Stwórz" }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  components: {},
  data: function () {
    return {
      loading: false,
    };
  },
  computed: {
    modalTitle() {
      return `${this.model.id == -1 ? "Tworzenie" : "Edycja"} płatności`;
    },
  },
  methods: {
    ok() {
      this.$emit("submit-edit", this.model);
      this.$bvModal.hide(this.modal_id);
    },
    async onShow() {},
    async loadResources() {
      this.loading = true;
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