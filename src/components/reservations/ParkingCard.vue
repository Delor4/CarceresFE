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
        filename: "ParkingCard.pdf",
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
    convDate(d) {
      if (!d) return "";
      d = new Date(d);
      const offset = d.getTimezoneOffset();
      var newDate = new Date(d.getTime() - offset * 60 * 1000);
      return newDate.toISOString().split("T")[0];
    },
  },
  mounted() {},
  components: {
    VueHtml2pdf,
  },
  props: ["card"],
  computed: {},
};
</script>

<style>
</style>
