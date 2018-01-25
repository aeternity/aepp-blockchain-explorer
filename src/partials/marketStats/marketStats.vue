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
<style src='./marketStats.scss' lang='scss' />
