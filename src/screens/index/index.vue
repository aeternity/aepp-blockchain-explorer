<template>
  <div class='index-screen screen'>
    <header>
      <div class="grid">
        <div>
          <img src="@/assets/logo.svg" alt=""/>
          <h1>Blockchain Explorer</h1>
          <p>Search the æternity test network blockchain by block, transaction, address. Or go through the last changes or stats.</p>
        </div>
        <div class='search' v-on:keyup.enter='search()'>
          <input class='search-input' placeholder='Explore Block, Address' v-model='searchString' type="text">
          <button class='search-button' @click='search'>
            <img src="@/assets/search.svg" alt=""/>
            </button>
        </div>
      </div>
    </header>

    <market-stats v-if='env.VUE_APP_SHOW_MARKET_STATS'/>
    <latest-block />
    <recent-blocks />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import polling from '../../functions/polling'

/*
 * Creating polling instance
 */
const poll = polling()

/*
 * Regular expressions
 */
const blockHeightRegex = RegExp('^[0-9]+$')
const blockHashRegex = RegExp('^bh\\$[1-9A-HJ-NP-Za-km-z]{48,50}$')
const accountPublicKeyRegex = RegExp('^ak\\$[1-9A-HJ-NP-Za-km-z]{48,50}$')
const nameRegex = RegExp('^[a-zA-Z]+$')

export default {
  /*
   * View Data
   */
  data: function () {
    return {
      searchString: ''
    }
  },

  /*
   * Computed Properties
   */
  computed: mapState(['env']),

  /*
   * View Methods
   */
  methods: {
    async search () {
      if (blockHeightRegex.test(this.searchString)) {
        this.$router.push({ path: `/block/${this.searchString}` })
      } else if (blockHashRegex.test(this.searchString)) {
        this.$router.push({ path: `/block/${this.searchString}` })
      } else if (accountPublicKeyRegex.test(this.searchString)) {
        this.$router.push({ path: `/account/${this.searchString}` })
      } else if (nameRegex.test(this.searchString)) {
        // check if name
        const pubKey = await this.fetchDomain(this.searchString)
        if (pubKey) {
          this.$router.push({ path: `/account/${pubKey}` })
        } else {
          alert('not a valid block hash/height, account public key or domain name')
        }
      } else {
        alert('not a valid block hash/height or account public key')
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
  },

  /*
   * Before and After route events
   */
  beforeRouteEnter (to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    return next((vm) => poll.fetch.call(vm, 'blocks/getLatestBlocks', 10))
  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    return poll.close('blocks/getLatestBlocks', () => next())
  }
}
</script>
<style src='./index.scss' lang='scss' />
