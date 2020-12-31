<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="Paragon"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      :html-to-pdf-options="htmlOptions"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <section class="pdf-item">
          <div class="pdf-date">
            <div>
              <span>Data sprzedaży: </span>
              <span>{{ formatDate(receipt.payment.sale_date) }}</span>
            </div>
            <div>
              <span>Data transakcji: </span>
              <span>{{ formatDate(receipt.payment.paid_date) }}</span>
            </div>
          </div>

          <h4>
            Paragon niefiskalny {{ receipt.payment.id }}/{{
              new Date(receipt.payment.paid_date).getUTCFullYear()
            }}
          </h4>

          <!---TABELA--->
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Lp.</th>
                <th scope="col">Nazwa usługi</th>
                <th scope="col">Ilość</th>
                <th scope="col">Kwota</th>
                <th scope="col">Vat</th>
                <th scope="col">Wartość</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Opłata parkingowa</td>
                <td>1</td>
                <td>{{ formatCurrency(receipt.payment.price / 100) }}</td>
                <td>{{ receipt.payment.tax }}%</td>
                <td>{{ formatCurrency(receipt.payment.value / 100) }}</td>
              </tr>
            </tbody>
          </table>

          <div style="text-align: left; margin-top: 50px">
            <span>Sposób płatności: </span>
            <span>
              {{
                receipt.payment.paid_type == 1
                  ? "Gotówka"
                  : receipt.payment.paid_type == 2
                  ? "Przelew zewnętrzny"
                  : "Inna wpłata"
              }}
            </span>
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
        filename: "Potwierdzenie.pdf",
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

<style scoped>
.pdf-item h4 {
  font-weight: bold;
  margin-top: 50px;
  text-align: center;
}

.pdf-item .pdf-date {
  text-align: right;
  margin-right: 45px;
}
</style>
