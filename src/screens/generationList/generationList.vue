<template>
  <div class="generation-list-screen screen">
    <div class="inner">
      <div class="grid">
        <div class="title">Generations</div>
        <div class="field average-block-time">
          <span class="field-name">average rate 1 per </span>
          <relative-time :ts="getAverageBlockTime" big spaced/>
        </div>
        <div>
          <span class="field-name">last key block mined</span>
          <relative-time :ts="getLastMinedBlockTime(this.currentTime)" big spaced/>
          <span class="field-name">ago</span>
        </div>
      </div>

      <table class="transactions">
        <tr v-for="i in numGenerations" :key="i">
          <td>
            <div class="height" v-if="generations[i-1]">
              <router-link :to="`/generation/${generations[i-1].keyBlock.height}`">
                {{ generations[i-1].keyBlock.height }}
              </router-link>
            </div>
            <div class="fill-dummy" v-else>
              &nbsp;
            </div>
          </td>
          <td>
            <span class="field-name">key-hash</span>
            <span v-if="generations[i-1]" class="number">
                <ae-hash type="short" :hash="generations[i-1].keyBlock.hash"/>
              </span>
            <span class="fill-dummy" v-else>
              &nbsp;
            </span>
          </td>
          <td>
            <span class="number" v-if="generations[i-1]">
              {{ generations[i-1].microBlocksDetailed.length }}
            </span>
            <span class="fill-dummy-small" v-else>
              &nbsp;
            </span>
            <span class="field-name">Micro Blocks</span>
          </td>
          <td>
            <span class="number" v-if="generations[i-1]">
              {{ generations[i-1].numTransactions }}
            </span>
            <span class="fill-dummy-small" v-else>
              &nbsp;
            </span>
            <span class="field-name">Transaction(s)</span>
          </td>
          <td>
            <span class="field-name">mined by</span>
            <span class="account-address" v-if="generations[i-1]">
              <router-link :to="`/account/${generations[i-1].keyBlock.miner}`">
                <named-address :address="generations[i-1].keyBlock.miner"/>
              </router-link>
            </span>
            <span class="fill-dummy" v-else>
              &nbsp;
            </span>
          </td>
          <td>
            <span class="field-name">time</span>
            <span class="number" v-if="generations[i-1]">
              <relative-time :ts="currentTime - generations[i-1].keyBlock.time"/>
            </span>
            <span class="fill-dummy" v-else>
              &nbsp;
            </span>
          </td>
        </tr>
      </table>
      <div class="center">
        <loader v-if="isLoadingMore" />
        <ae-button v-else type="dramatic" @click="loadMore">load more</ae-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { AeButton } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import NamedAddress from '../../components/namedAddress'
import AeHash from '../../components/aeHash'
import Loader from '../../components/loader'

export default {
  components: { AeButton, RelativeTime, NamedAddress, AeHash, Loader },
  mixins: [currentTime],
  data: function () {
    return {
      isLoadingMore: false,
      numGenerations: 4
    }
  },
  computed: {
    ...mapState('blocks', [
      'generations'
    ]),
    ...mapGetters('blocks', [
      'getAverageBlockTime',
      'getLastMinedBlockTime'
    ])
  },
  methods: {
    loadMore: async function () {
      this.isLoadingMore = true
      this.numGenerations += 10
      await this.$store.dispatch('blocks/getLatestGenerations', this.generations.length + 10)
      this.isLoadingMore = false
    }
  },
  mounted: async function () {
    this.numGenerations = 10
    this.$store.dispatch('blocks/getLatestGenerations', 10)
  },
  activated: async function () {
    this.numGenerations = 10
    this.$store.dispatch('blocks/getLatestGenerations', 10)
  }
}
</script>
<style src='./generationList.scss' lang='scss'/>
