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

      <table class="transactions" v-if="generations.length">
        <tr v-for="(b, i) in generations" :key="i">
          <td>
            <div class="height">
              <router-link :to="`/generation/${b.keyBlock.height}`">
                {{ b.keyBlock.height }}
              </router-link>
            </div>
          </td>
          <td>
            <span class="field-name">key-hash</span>
            <span v-if="b.keyBlock.hash" class="number">
                <ae-hash type="short" :hash="b.keyBlock.hash"/>
              </span>
            <span v-else>n/a</span>
          </td>
          <td>
            <span class="number">{{ b.micros.length }}</span>
            <span class="field-name">Micro Blocks</span>
          </td>
          <td>
            <span class="number">{{ b.transactionNumber }}</span>
            <span class="field-name">Transaction(s)</span>
          </td>
          <td>
            <span class="field-name">mined by</span>
            <span class="account-address">
                <router-link :to="`/account/${b.keyBlock.miner}`">
                  <named-address :address="b.keyBlock.miner"/>
                </router-link>
              </span>
          </td>
          <td>
            <span class="field-name">time</span>
            <span class="number">
                <relative-time :ts="currentTime - b.keyBlock.time"/>
              </span>
          </td>
        </tr>
      </table>
      <loader v-else/>
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
      isLoadingMore: false
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
      await this.$store.dispatch('blocks/getLatestGenerations', this.generations.length + 10)
      this.isLoadingMore = false
    }
  },
  mounted: async function () {
    this.$store.dispatch('blocks/getLatestGenerations', 10)
  },
  activated: async function () {
    this.$store.dispatch('blocks/getLatestGenerations', 10)
  }
}
</script>
<style src='./generationList.scss' lang='scss'/>
