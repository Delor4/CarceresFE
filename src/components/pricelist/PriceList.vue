<template>
  <div>
    <h4>Cennik</h4>
    <table class="pricelist">
      <th>Doby</th>
      <th>Cena (netto)</th>
      <th>Cena (brutto)</th>
      <tr v-for="(price, index) in prices" v-bind:key="index">
        <td>{{ index }}</td>
        <td>{{ formatCurrency(price / 100) }}</td>
        <td>{{ formatCurrency((price * (1 + calcTax() / 100)) / 100) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      prices: {},
    };
  },
  methods: {
    calcPrices() {
      var old_price = 0;
      for (var i = 1; i <= 365; ++i) {
        var price = this.calcPriceByDays(i) * 100;
        if (price != old_price) {
          this.prices[i] = price;
          old_price = price;
        }
      }
    },
  },
  mounted() {},
  created() {
    this.calcPrices();
  },
  components: {},
};
</script>

<style scoped>
table.pricelist {
    font-size:16px;
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    border-spacing: 0;
    margin: auto;
}

.pricelist td, .pricelist th {
    border: 1px solid #fff;
    text-align: left;
    padding: 8px;
}

.pricelist tr:nth-child(even){background-color: #e5e5e5}

.pricelist td:first-child{
  font-weight: bold;
}

.pricelist tr:hover{background-color: #fca311}

.pricelist td {
  text-align: right;
}

.pricelist th {
    padding-top: 11px;
    padding-bottom: 11px;
    background-color: #14213d;
    color: white;
}
</style>
