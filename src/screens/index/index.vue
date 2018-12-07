<template>
  <div class="index-screen screen">
    <header>
      <div class="grid">
        <div>
          <img
            src="@/assets/logo.svg"
            alt=""
          >
          <h1>Blockchain Explorer</h1>
          <p>Search the æternity network blockchain by block, transaction, address. Or go through the last changes or stats.</p>
        </div>
        <div
          class="search"
          @keyup.enter="search()"
        >
          <input
            v-model="searchString"
            class="search-input"
            placeholder="Explorer Generation, Block, Tx, Address"
            type="text"
          >
          <button
            class="search-button"
            @click="search"
          >
            <img
              src="@/assets/search.svg"
              alt=""
            >
          </button>
        </div>
      </div>
    </header>

    <MarketStats v-if="VUE_APP_SHOW_MARKET_STATS" />
    <LatestBlock />
    <RecentBlocks />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pollAction from '../../mixins/pollAction'
import MarketStats from '../../partials/marketStats/marketStats'
import LatestBlock from '../../partials/latestBlock/latestBlock'
import RecentBlocks from '../../partials/recentBlocks/recentBlocks'

const blockHeightRegex = RegExp('^[0-9]+$')
const blockHashRegex = RegExp('^[km]h_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const accountPublicKeyRegex = RegExp('^ak_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const transactionHashRegex = RegExp('^th_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const nameRegex = RegExp('^[a-zA-Z]+$')

export default {
  components: { MarketStats, LatestBlock, RecentBlocks },
  mixins: [pollAction('blocks/getLatestGenerations', 4)],
  data () {
    return {
      searchString: '',
      VUE_APP_SHOW_MARKET_STATS: process.env.VUE_APP_SHOW_MARKET_STATS
    }
  },
  computed: {
    ...mapState('blocks', [
      'height'
    ])
  },
  methods: {
    async search () {
      if (blockHeightRegex.test(this.searchString) && (this.searchString <= this.height)) {
        this.$router.push({ path: `/generation/${this.searchString}` })
      } else if (blockHashRegex.test(this.searchString)) {
        this.$router.push({ path: `/generation/${this.searchString}` })
      } else if (transactionHashRegex.test(this.searchString)) {
        try {
          await this.$store.dispatch('transactions/getTxByHash', this.searchString)
          this.$router.push({ path: `/tx/${this.searchString}` })
        } catch (e) {
          alert('not a valid block hash/height/tx, account public key or domain name')
        }
      } else if (accountPublicKeyRegex.test(this.searchString)) {
        this.$router.push({ path: `/generation/${this.searchString}` })
      } else if (nameRegex.test(this.searchString)) {
        // check if name
        const pubKey = await this.fetchDomain(this.searchString)
        if (pubKey) {
          this.$router.push({ path: `/account/${pubKey}` })
        } else {
          alert('not a valid block hash/height/tx, account public key or domain name')
        }
      } else {
        alert('not a valid block hash/height/tx or account public key')
      }
    },
    async fetchDomain (domain) {
      const BASE_URL = process.env.VUE_APP_EPOCH_URL
      domain = domain.toLowerCase().trim()
      if (!domain.endsWith('.aet')) {
        domain += '.aet'
      }
      try {
        const fetchResult = await fetch(`${BASE_URL}/v2/name?name=${domain}`)
        const fetchJson = await fetchResult.json()
        if (fetchJson && fetchJson.pointers && typeof fetchJson.pointers === 'string') {
          fetchJson.pointers = JSON.parse(fetchJson.pointers)
        }
        if (fetchJson.pointers && fetchJson.pointers.account_pubkey) {
          return fetchJson.pointers.account_pubkey
        }
        return null
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }
}
</script>
<style src='./index.scss' lang='scss' />
