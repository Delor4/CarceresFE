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
      <p>Netto: {{ formatCurrency(model.price / 100) }}</p>
      <p>Podatek: {{ model.tax }}%</p>
      <p>Brutto: {{ formatCurrency(model.value / 100) }}</p>
    </b-form>
    <template #modal-footer="{ ok, cancel, hide }">
      <b-button variant="secondary" @click="cancel()"> Anuluj </b-button>
      <b-button
        :hidden="model.id == -1"
        variant="danger"
        @click="
          $emit('unpaid-model', model);
          hide();
        "
      >
        Nieopłacono
      </b-button>
      <b-button v-if="!model.paid" variant="success" @click="ok()">
        <b-icon-cash></b-icon-cash>
        {{ model.id != -1 ? "Opłacono" : "Stwórz" }}
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