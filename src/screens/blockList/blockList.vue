<template>
  <div class="block-list-screen screen">
    <div class="inner">
    <div class="grid">
      <div class='title'>
        Blocks
      </div>
      <div class="field average-block-time">
        <span class='field-name'>average rate 1 per </span>
        <span class='ago' v-html='$options.filters.agoFormat(averageBlockTime)'/>
      </div>
      <div>
        <span class="field-name">
        last block mined
        </span>
        <span class='ago' v-html='$options.filters.agoFormat(lastBlockAgo)'/>
        <span class="field-name">
        ago
        </span>
     </div>
    </div>

    <table class='transactions'>
      <tr v-for='b in apiBlocks'>
        <template v-if="typeof b.then === 'undefined'">
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
              {{b.hash | startAndEnd }}
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
              <router-link :to='"/account/" + b.transactions[0].tx.account'>
                {{b.transactions[0].tx.account | startAndEnd}}
              </router-link>
            </span>
          </td>
          <td>
            <span class="field-name">
              time
            </span>
            <span class="number">
              <span class='' v-html='$options.filters.agoFormat(currentTime - b.time)'/>
            </span>
          </td>
        </template>
        <template v-else-if="typeof b.then !== 'undefined'">
          <td colspan="3">
          Loading..
          </td>
        </template>
      </tr>
    </table>
    <div class="center">
      <ae-button invert type='exciting' @click='getBlocks(10)'>
        load more
      </ae-button>
    </div>
    </div>
  </div>
</template>
<script>
import {
  AeButton
} from '@aeternity/aepp-components'
export default {
  components: {
    AeButton
  },
  data () {
    return {
      currentTime: null,
      blockHeight: null,
      apiBlocks: []
    }
  },
  computed: {
    averageBlockTime () {
      return this.apiBlocks.reduce(
        (sum, block, i, blocks) => {
          if (typeof block.then !== 'undefined') {
            return sum
          }
          if (i === 0) {
            return sum + (new Date() - block.time)
          }
          if (typeof blocks[i - 1].then !== 'undefined') return sum
          return sum + (blocks[i - 1].time - block.time)
        }
        , 0) / this.apiBlocks.filter(b => typeof b.then === 'undefined').length
    },
    lastBlockAgo () {
      if (this.apiBlocks.length > -1 && typeof this.apiBlocks[0].time !== 'undefined') {
        return this.currentTime - this.apiBlocks[0].time
      }
      return null
    }
  },
  methods: {
    getBlocks (count) {
      let i
      for (i = this.blockHeight; i > this.blockHeight - count; i--) {
        let x = this.$http.get('internal/v2/block/height/' + i + '?tx_encoding=json', { })
        this.apiBlocks.push(x)
      }
      this.apiBlocks.forEach((x, i) => {
        if (typeof x.then === 'undefined') return
        x.then(resp => {
          this.$set(this.apiBlocks, i, resp.body)
        })
      })
      this.blockHeight = i
    }
  },
  mounted () {
    setInterval(() => {
      this.currentTime = new Date()
    }, 1000)

    this.$http.get(`internal/v2/block/number`
    ).then(resp => {
      this.blockHeight = resp.body.height
      this.getBlocks(10)
    }, resp => {
    })
  }
}
</script>
<style src='./blockList.scss' lang='scss' />
