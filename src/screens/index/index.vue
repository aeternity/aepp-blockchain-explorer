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

    <market-stats />
    <latest-block />
    <recent-blocks />
  </div>
</template>

<script>
import MarketStats from '@/partials/marketStats/marketStats.vue'
import LatestBlock from '@/partials/latestBlock/latestBlock.vue'
import RecentBlocks from '@/partials/recentBlocks/recentBlocks.vue'
import pollAction from '@/mixins/pollAction'

const blockHeightRegex = RegExp('^[0-9]+$')
const blockHashRegex = RegExp('^bh\\$[1-9A-HJ-NP-Za-km-z]{48,49}$')
const accountPublicKeyRegex = RegExp('^ak\\$[1-9A-HJ-NP-Za-km-z]{93,94}$')

export default {
  data () {
    return {
      searchString: ''
    }
  },
  components: {
    MarketStats: MarketStats,
    LatestBlock: LatestBlock,
    RecentBlocks: RecentBlocks
  },
  mixins: [pollAction('loadLastBlocks', [4])],
  methods: {
    search () {
      if (blockHeightRegex.test(this.searchString)) {
        this.$router.push({ path: `/block/${this.searchString}` })
      } else if (blockHashRegex.test(this.searchString)) {
        this.$router.push({ path: `/block/${this.searchString}` })
      } else if (accountPublicKeyRegex.test(this.searchString)) {
        this.$router.push({ path: `/account/${this.searchString}` })
      } else {
        alert('not a valid block hash/height or account public key')
      }
    }
  }
}
</script>
<style src='./index.scss' lang='scss' />
