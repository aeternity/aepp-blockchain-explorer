<template>
  <div class="market-stats-partial">
    <div class="grid">
      <div class="market-cap">
        <div>Market Cap</div>
        <span v-if='apiMarket' class="number">
          {{apiMarket.market_cap_chf}}
        </span>
        <span class="unit">CHF</span>
      </div>
      <div class="div btc-price">
        <div>1 AE</div>
        <span v-if='apiMarket' class="number">
          {{apiMarket.price_btc}}
        </span>
        <span class="unit">BTC</span>
      </div>
      <div class="chf-price">
        <div>1 AE</div>
        <span v-if='apiMarket' class="number">
          {{apiMarket.price_chf}}
        </span>
        <span class="unit">CHF</span>
      </div>
    </div>
    <!--<div class="button">View all stats</div>-->
  </div>
</template>
<script>
export default {
  data () {
    return {
      apiMarket: null
    }
  },
  methods: {
    getMarketData () {
      this.$http.get('https://api.coinmarketcap.com/v1/ticker/aeternity/?convert=CHF'
      ).then(resp => {
        this.apiMarket = resp.body[0]
      }, resp => {
      })
    }
  },
  created () {
    this.getMarketData()
  }
}
</script>
<style>
.market-stats-partial {
  text-align:center;
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.11);
  border-radius: 10px;
  width:calc(100% - 50px);
  max-width:1030px;
  padding:30px 0;
}
.market-stats-partial .grid {
  justify-content:center;
}
.market-stats-partial .grid > * {
  padding:30px;
}
.market-stats-partial .grid > * + * {
  border-left:2px solid #F0F0F0;
}
.market-stats-partial .number {
  font-size:30px;
}
.market-stats-partial .unit {
  font-size:14px;
}
</style>
