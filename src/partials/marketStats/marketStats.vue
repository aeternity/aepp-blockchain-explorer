<template>
  <div class="market-stats-partial">
    <div class="grid">
      <div class="market-cap">
        <div>Market Cap</div>
        <span v-if="marketCapChf" class="number">
          {{marketCapChf / 1000000 | round}}
          M
        </span>
        <span class="unit">CHF</span>
      </div>
      <div class="div btc-price">
        <div>1 AE</div>
        <span v-if="priceBtc" class="number">
          {{priceBtc | round(6)}}
        </span>
        <span class="unit">BTC</span>
      </div>
      <div class="chf-price">
        <div>1 AE</div>
        <span v-if="priceChf" class="number">
          {{priceChf | round}}
        </span>
        <span class="unit">CHF</span>
      </div>
    </div>
    <div class="source">
      data provided by: <a href="https://coinmarketcap.com/currencies/aeternity" target="_blank">coinmarketcap.com</a>
    </div>
  </div>
</template>
<script>
/**
 * Importing libraries
 */
import { mapState } from 'vuex'

/**
 * Import mixins
 */
import pollAction from '@/mixins/pollAction'

/**
 * Export component
 */
export default {
  /**
   * Mixins
   */
  mixins: [
    pollAction('_marketStats/get')
  ],

  /**
   * Computed properties
   */
  computed: mapState('_marketStats', [
    'priceChf',
    'marketCapChf',
    'priceBtc'
  ])
}
</script>
<style src='./marketStats.scss' lang='scss' />
