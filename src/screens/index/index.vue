<template>
  <div class='index-screen screen'>
    <header>
      <div class="grid">
        <div>
          <img src="@/assets/logo.svg" alt=""/>
          <h1>Blockchain Explorer</h1>
          <p>Search the æternity test network blockchain by block, transaction, address. Or go through the last changes or stats.</p>
        </div>
        <div class='search'>
          <input class='search-input' placeholder='Explore Block, Transaction, Address' v-model='searchString' type="text">
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
  methods: {
    search () {
    }
  }
}
</script>
<style>
.index-screen header {
  background-image: linear-gradient(-134deg, #6F53A1 0%, #311B58 100%);
  color: #FFFFFF;
  padding-bottom:200px;
}
.index-screen header h1 {
  font-size:50px;
  font-weight:500;
  margin:0;
}
.index-screen header .grid {
  align-items:flex-end;
  justify-content:space-between;
  width:calc(100% - 40px);
  margin:0 auto;
  padding-top:50px;
  max-width:1040px;
}
.index-screen header .grid > * {
  width:calc(50% - 50px);
}
.index-screen header .grid > * > :last-child {
  margin-bottom:0;
}
.index-screen header .grid .search {
  display:flex;
  justify-content:flex-end;
}
.search-input {
  /* background: */
  background: #F5F5F5;
  box-shadow: 0 4px 8px 0 rgba(60,60,60,0.10);
  border-radius: 100px 0 00px 100px;
  width:100%;

  padding:15px 0 15px 20px;
  font-size:16px;
}
.search-button {
  background: #F7296E;
  box-shadow: 0 4px 8px 0 rgba(60,60,60,0.10);
  border-radius: 0 50px 50px 0;
  border:none;
  color:white;
  padding:15px 25px 15px 20px;
}
.index-screen .market-stats-partial{
  margin:-100px auto 40px auto;
}

</style>
