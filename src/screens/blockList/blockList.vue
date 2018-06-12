<template>
  <div class="block-list-screen screen">
    <div class="inner">
    <div class="grid">
      <div class='title'>
        Blocks
      </div>
      <div class="field average-block-time">
        <span class='field-name'>average rate 1 per </span>
        <relative-time :ts="averageBlockTime" big spaced />
      </div>
      <div>
        <span class="field-name">
        last block mined
        </span>
        <relative-time :ts="lastBlockAgo" big spaced />
        <span class="field-name">
        ago
        </span>
     </div>
    </div>

    <table class='transactions'>
      <tr v-for='b in blocks'>
        <template v-if="b">
          <td>
            <div class="block-number">
              <router-link :to='"/block/" + b.height'>
                {{b.height}}
              </router-link>
            </div>
          </td>
          <td>
            <span class="field-name">
              hash
            </span>
            <span v-if='b.hash' class="number">
              <ae-hash type='short' :hash='b.hash'/>
            </span>
            <span v-else>n/a</span>
          </td>
          <td>
            <span class="field-name">
            target
            </span>
            <span class="number">
              {{b.target}}
            </span>
          </td>
          <td>
            <span class='number'>
              {{b.transactions.length}}
            </span>
            <span class="field-name">
              Transaction(s)
            </span>
          </td>
          <td>
            <span class="field-name">
              mined by
            </span>
            <span class="account-address">
              <router-link :to='"/account/" + b.miner'>
                <named-address :address='b.miner'/>
              </router-link>
            </span>
          </td>
          <td>
            <span class="field-name">
              time
            </span>
            <span class="number">
              <relative-time :ts="currentTime - b.time" />
            </span>
          </td>
        </template>
        <template v-else>
          <td colspan="3">
          Loading..
          </td>
        </template>
      </tr>
    </table>
    <div class="center">
      <ae-button invert type='exciting' @click='loadMore'>
        load more
      </ae-button>
    </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  AeButton
} from '@aeternity/aepp-components'
import RelativeTime from '../../components/relativeTime.vue'
import NamedAddress from '../../components/namedAddress/namedAddress.vue'
import AeHash from '../../components/aeHash/aeHash.vue'
import currentTime from '../../mixins/currentTime'
import pollAction from '../../mixins/pollAction'
export default {
  components: {
    AeButton,
    AeHash,
    NamedAddress,
    RelativeTime
  },
  mixins: [currentTime, pollAction('loadLastBlocks', [10])],
  computed: {
    ...mapState({
      blocks: state => {
        const blocks = []
        let height = Math.max(...Object.keys(state.blocks).filter(i => !isNaN(+i)))
        while (state.blocks[height]) {
          blocks.push(state.blocks[height])
          height--
        }
        return blocks
      }
    }),
    averageBlockTime () {
      const blockTimes = this.blocks.map((block, idx, blocks) =>
        idx + 1 < blocks.length && blocks[idx].time - blocks[idx + 1].time)
      blockTimes.pop()
      return blockTimes.reduce((a, b) => a + b, 0) / blockTimes.length
    },
    lastBlockAgo () {
      return this.blocks[0] ? this.currentTime - this.blocks[0].time : null
    }
  },
  methods: {
    loadMore () {
      for (let i = 1; i <= 10; i++) {
        this.$store.dispatch('loadBlock', {
          height: this.blocks[this.blocks.length - 1].height - i
        })
      }
    }
  }
}
</script>
<style src='./blockList.scss' lang='scss' />
