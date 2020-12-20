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
        <section class="pdf-item page1">
          <div class="idcodes">
            <div class="codescontainer" id="container">
              <barcode
                :value="barcode_value"
                width="3"
                class="barcode"
                textPosition="bottom"
              >
                {{ "#" + barcode_value }}
              </barcode>
              <qrcode-vue
                :value="qrcode_value"
                :size="qrcode_size"
                level="H"
                class="qrcode"
              ></qrcode-vue>
            </div>
          </div>
          <div class="card_content">
            <img class="logo" src="logo_bw.png" />
            <h2>Carceres - Parking strzeżony</h2>
            <h4>Karta parkingowa</h4>
            <div class="car-plate">Nr rej.: {{ card.subscription.car.plate }}</div>
            <div class="zone">Parking: {{ card.subscription.place.zone.name }}</div>
            <div class="place">
              Miejsce: {{ card.subscription.place.nr }}
              {{
                card.subscription.place.name
                  ? "(" + card.subscription.place.name + ")"
                  : ""
              }}
            </div>
            <div class="subscription">Ważność: {{ formatDateTime(card.subscription.end) }}</div>
            <div class="footer">
              <small>
              Wydrukuj kartę lub pobierz na urządzenie mobilne. Okaż kartę
                pracownikowi lub zeskanuj przy wjeździe na parking.
              </small>
            </div>
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
        margin: 5.5,
        filename: "ParkingCard.pdf",
        image: {
          type: "jpeg",
          quality: 0.98,
        },
      },
      qrcode_size: 100,
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
      return "#" + String(this.card.subscription.id).padStart(5, "0");
    },
  },
};
</script>

<style scoped>
#container {
  display: inline-block;
  position: relative;
  width: 100%;
  white-space: nowrap;
  padding-right: 85px;
}
.qrcode {
  display: inline-block;
  vertical-align: top;
}
.barcode {
  display: inline-block;
  vertical-align: top;
  transform-origin: right top;
  transform: rotate(270deg) translate(-105px, -10px);
  -ms-transform: rotate(270deg) translate(-105px, -10px);
  -moz-transform: rotate(270deg) translate(-105px, -10px);
  -webkit-transform: rotate(270deg) translate(-105px, -10px);
  -o-transform: rotate(270deg) translate(-105px, -10px);
}
.idcodes {
  float: right;
}
.card_content {
  max-width: 75%;
}
</style>
