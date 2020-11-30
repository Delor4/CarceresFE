<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="Receipt"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="800px"
      :html-to-pdf-options="htmlOptions"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <section class="pdf-item">
          <h4>Paragon niefiskalny</h4>

          <div>
            Data sprzedaży:
            <span>{{ formatDate(receipt.payment.sale_date) }}</span>
          </div>
          <div>
            <span>Opłata parkingowa</span>
            <span>1 * {{ receipt.payment.price / 100 }}</span>
          </div>
          <div>
            <span>tax: {{ receipt.payment.tax }}%</span>
          </div>
          <div>
            <span>Suma PLN: {{ receipt.payment.value / 100 }}</span>
          </div>
          <div>
            <span
              >{{
                receipt.payment.paid_type == 1
                  ? "Gotówka"
                  : receipt.payment.paid_type == 2
                  ? "Przelew zewnętrzny"
                  : "Inna wpłata"
              }}
              PLN: {{ receipt.payment.value / 100 }}</span
            >
          </div>
          <div>
            Data transakcji:
            <span>{{ formatDate(receipt.payment.paid_date) }}</span>
          </div>
        </section>
        <div class="html2pdf__page-break" />
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";

export default {
  data: function () {
    return {
      htmlOptions: {
        margin: 2.5,
        filename: "Receipt.pdf",
        image: {
          type: "jpeg",
          quality: 0.98,
        },
      },
    };
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
  mounted() {},
  components: {
    VueHtml2pdf,
  },
  props: ["receipt"],
  computed: {},
};
</script>

<style>
</style>
