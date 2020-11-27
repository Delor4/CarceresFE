<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="ParkingCard"
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
          <h4>Karta parkingowa</h4>
          <div>Nr rej.: {{ card.subscription.car.plate }}</div>
          <div>Parking: {{ card.subscription.place.zone.name }}</div>
          <div>
            Miejsce: {{ card.subscription.place.nr }}
            {{
              card.subscription.place.name
                ? "(" + card.subscription.place.name + ")"
                : ""
            }}
          </div>
          <div>Ważność: {{ convDateTime(card.subscription.end) }}</div>
          <div>
            <qrcode-vue
              :value="qrcode_value"
              :size="qrcode_size"
              level="H"
            ></qrcode-vue>
            <barcode :value="barcode_value" width="3">
              {{ "#" + barcode_value }}
            </barcode>
          </div>
        </section>
        <div class="html2pdf__page-break" />
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import QrcodeVue from "qrcode.vue";
import VueBarcode from "vue-barcode";

export default {
  data: function () {
    return {
      htmlOptions: {
        margin: 2.5,
        filename: "ParkingCard.pdf",
        image: {
          type: "jpeg",
          quality: 0.98,
        },
      },
      qrcode_size: 300,
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
    "qrcode-vue": QrcodeVue,
    barcode: VueBarcode,
  },
  props: ["card"],
  computed: {
    qrcode_value() {
      return (
        "https://www.youtube.com/watch?v=RalyhEjVNuk#" +
        this.card.subscription.id
      );
    },
    barcode_value() {
      return "#" + this.card.subscription.id;
    },
  },
};
</script>

<style>
</style>
