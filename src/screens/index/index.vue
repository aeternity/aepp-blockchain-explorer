<template>
  <div class="index-screen screen">
    <header>
      <div class="grid">
        <div>
          <h1>æternity explorer</h1>
          <p>æternity blockchain explorer shows detailed information on blocks and transactions.</p>
        </div>
        <div
          class="search"
          @keyup.enter="search()"
        >
          <input
            v-model="searchString"
            class="search-input"
            placeholder="Explore Generation, Block, Tx, Address"
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
    <LatestGeneration />
    <RecentGenerations />
    <AeModalLight
      v-if="showError"
      title="Error..."
      @close="showError = false; error = ''"
    >
      {{ error }}
    </AeModalLight>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AeModalLight } from '@aeternity/aepp-components'
import pollAction from '../../mixins/pollAction'
import MarketStats from '../../partials/marketStats/marketStats'
import LatestGeneration from '../../partials/latestGeneration/latestGeneration'
import RecentGenerations from '../../partials/recentGenerations/recentGenerations'

const blockHeightRegex = RegExp('^[0-9]+$')
const keyBlockHashRegex = RegExp('^kh_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const microBlockHashRegex = RegExp('^mh_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const accountPublicKeyRegex = RegExp('^ak_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const transactionHashRegex = RegExp('^th_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const nameRegex = RegExp('^[a-zA-Z]+$')

export default {
  components: { MarketStats, LatestGeneration, RecentGenerations, AeModalLight },
  mixins: [pollAction('blocks/getLatestGenerations', 4)],
  data () {
    return {
      searchString: '',
      showError: false,
      error: '',
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
      if (!this.$store.getters.isConnected) {
        this.showError = true
        this.error = 'Connection to node is broken. Try again later.'
        return
      }
      let validationResult = await this.validateRegex()
      let param = this.searchString
      if (validationResult.valid) {
        try {
          if (validationResult.type === 'domain') {
            const pubKey = await this.fetchDomain(param)
            if (pubKey) {
              param = pubKey
            } else {
              throw new Error('Pubkey not found')
            }
          } else if (validationResult.type !== 'domain' && validationResult.type !== 'height') {
            await this.$store.dispatch(validationResult.type, param)
          }
          this.$router.push({ path: `/${validationResult.endpoint}/${param}` })
        } catch (error) {
          validationResult.valid = false
        }
      }
      if (!validationResult.valid) {
        this.showError = true
        this.error = 'Not a valid Block Hash/Height/Tx, an Account Public Key or an Æ Domain Name.'
        this.searchString = ''
      }
    },
    async validateRegex () {
      let type = null
      let valid = true
      let endpoint = null
      this.searchString = this.searchString.trim()
      if (blockHeightRegex.test(this.searchString) && (this.searchString <= this.height)) {
        endpoint = 'generation'
        type = 'height'
      } else if (keyBlockHashRegex.test(this.searchString)) {
        endpoint = 'generation'
        type = 'blocks/getGenerationFromHash'
      } else if (microBlockHashRegex.test(this.searchString)) {
        endpoint = 'block'
        type = 'blocks/getBlockFromHash'
      } else if (transactionHashRegex.test(this.searchString)) {
        endpoint = 'tx'
        type = 'transactions/getTxByHash'
      } else if (accountPublicKeyRegex.test(this.searchString)) {
        endpoint = 'account'
        type = 'accounts/get'
      } else if (nameRegex.test(this.searchString)) {
        endpoint = 'account'
        type = 'domain'
      } else {
        valid = false
      }
      return { valid, type, endpoint }
    },
    async fetchDomain (domain) {
      const BASE_URL = process.env.VUE_APP_NODE_URL
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
        return null
      }
    }
  }
}
</script>
<style src='./index.scss' lang='scss' />
