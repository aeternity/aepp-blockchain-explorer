<template>
  <div  v-if='apiBlock' class="block-screen screen">
    <div class="header">
      <div class="basic-block-info grid">
        <div class=''>
          <span>Block</span>
          <span class='number block-height'>{{apiBlock.height}}</span>
        </div>
        <div>
          <span class='field-name'>mined by</span>
          <span class="account-address">
            <router-link :to='"/account/" + minedBy'>
              {{minedBy | startAndEnd }}
            </router-link>
          </span>
        </div>
        <div>
          <span class='field-name'>time since mined</span>
          <span class='ago' v-html='$options.filters.agoFormat(ago)'/>
        </div>
      </div>
      <div class="detail-block-info">
        <div class="field hash">
          <div class='field-name'>Hash</div>
          <div v-if='apiBlock.hash' class="scroll">
            <div class='number'>{{ apiBlock.hash }}</div>
          </div>
          <div v-else class='field-value number'>N/A</div>
        </div>
        <div class="grid">
          <div class="field height">
            <div class='field-name'>Height</div>
            <div class='field-value number'>{{ apiBlock.height }}</div>
          </div>
          <div class="field rewarded">
            <div class='field-name'>Target</div>
            <div class="field-value number">
              {{ apiBlock.target }}
            </div>
          </div>
          <div class="field time">
            <div class='field-name'>
              Time (<span class='number'>{{ apiBlock.time }}</span>)
            </div>
            <div class="field-value number">
              {{ apiBlock.time | humanDate}}
            </div>
          </div>
        </div>
        <div class="field hash">
          <div class='field-name'>Parent Hash</div>
          <div class="field-value block-hash">
            <router-link :to="'/block/' + apiBlock.prev_hash">
              {{apiBlock.prev_hash | startAndEnd }}
            </router-link>
          </div>
        </div>
      </div>
      <div class='block-navigation grid'>
        <router-link :to="'/block/' + (apiBlock.height - 1)">
          prev: {{apiBlock.height - 1}}
        </router-link>
        <router-link :to="'/block/' + (apiBlock.height + 1)">
          next: {{apiBlock.height + 1}}
        </router-link>
      </div>
    </div>
    <div class="block-transactions">
      <h2 class='title'>
        <span class='number'>{{txCount}}</span> Transaction(s)
      </h2>
      <div v-if='apiBlock.transactions'>
        <ae-panel :key='t.hash' v-for='t in apiBlock.transactions'>
          <transaction :transaction='t'/>
        </ae-panel>
      </div>
    </div>
  </div>
</template>

<script>
import Transaction from '../../components/transaction/transaction.vue'
import {
  AePanel
} from '@aeternity/aepp-components'
const blockHashRegex = RegExp('^bh\\$[1-9A-HJ-NP-Za-km-z]{48,49}')
const blockHeightRegex = RegExp('^[0-9]+')
export default {
  name: 'Block',
  components: {
    AePanel,
    Transaction
  },
  data () {
    return {
      currentTime: null,
      apiBlock: null
    }
  },
  computed: {
    minedBy () {
      return this.apiBlock.transactions.filter(t => t.tx.type === 'coinbase_tx')[0].tx.account
    },
    ago () {
      if (!this.apiBlock) { return null }
      return this.currentTime - this.apiBlock.time
    },
    txCount () {
      return this.apiBlock.transactions.length
    },
    blockId () {
      return this.$route.params.block
    }
  },
  watch: {
    blockId () {
      console.log('change')
      this.getBlock()
    }
  },
  methods: {
    getBlock () {
      if (blockHeightRegex.test(this.blockId)) {
        this.getBlockByHeight(this.blockId)
      } else if (blockHashRegex.test(this.blockId)) {
        this.getBlockByHash(this.blockId)
      }
    },
    getBlockByHeight (height) {
      this.$http.get('internal/v2/block/height/' + height + '?tx_encoding=json', {
      }).then(response => {
        this.apiBlock = response.body
      }, response => {
        console.log(response)
      })
    },
    getBlockByHash (hash) {
      this.$http.get('internal/v2/block/hash/' + hash + '?tx_encoding=json', {
      }).then(response => {
        this.apiBlock = response.body
      }, response => {
        console.log(response)
      })
    }
  },
  mounted () {
    this.getBlock()
    setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  }
}
</script>

<style src='./block.scss' lang='scss' />
