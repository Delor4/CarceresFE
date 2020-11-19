<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="Receipt"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="800px"
      @beforeDownload="beforeDownload($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <section class="pdf-item">
        <h4>
            Paragon niefiskalny
        </h4>

        <div><span>Opłata parkingowa</span><span>1 * {{receipt.payment.price / 100}}</span></div>
        <div><span>tax: {{receipt.payment.tax}}%</span></div>
        <div><span>Suma PLN: {{receipt.payment.value/100}}</span></div>
        </section>
        <div class="html2pdf__page-break"/>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";

export default {
  data: function () {
    return {};
  },
  methods: {
    /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
       async beforeDownload ({ html2pdf, options, pdfContent }) {
            await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages()
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i)
                    pdf.setFontSize(10)
                    pdf.setTextColor(150)
                    pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
                } 
            }).save()
        },
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
