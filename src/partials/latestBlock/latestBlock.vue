<template>
  <div class="latest-block-partial">
    <div class="grid" v-if='apiTop'>
      <div class="explanation">
        <h2 class='title'>Latest Block</h2>
        <ae-button type='exciting' size='small' :to='"/block/" + apiTop.height'>
          view last
        </ae-button>
        <ae-button type='exciting' size='small' to='/blocks'>
          view all
        </ae-button>
      </div>
      <div class="block-data">
        <div class="grid block-basic-info">
          <div class='number chain-height'>
            <img src="@/assets/block.svg" alt=""/>
            <router-link :to="'/block/'+apiTop.height">
            {{apiTop.height}}
            </router-link>
          </div>
          <div class='ago'>
            <span>mined</span>
            <relative-time :ts="lastBlockAgo" big />
            <span>ago</span>
          </div>
        </div>
        <div class="grid block-extended-info">
          <div class='field'>
            <div class="field-name">Hash</div>
            <div class='field-value block-hash'>
              <router-link :to="'/block/'+apiTop.hash">
                {{apiTop.hash | startAndEnd }}
              </router-link>
            </div>
          </div>
          <div class='field'>
            <div class='field-name'>Transactions</div>
            <div class="field-value number">
                {{txCount}}
            </div>
          </div>
          <div class='field'>
            <div class='field-name'>Mined by</div>
            <div v-if='minedBy' class="field-value account-address">
              <router-link :to='"/account/" + minedBy'>
              {{minedBy | startAndEnd }}
              </router-link>
            </div>
          </div>
        </div>
        <ae-button type='exciting' invert size='small' @click='getLatestBlock'>refresh </ae-button>
        updated {{autoUpdateIn }} sek ago
      </div>
    </div>
  </div>
</template>
<script>
import {
  AeButton
} from '@aeternity/aepp-components'
import RelativeTime from '../../components/relativeTime.vue'
export default {
  components: {
    AeButton,
    RelativeTime
  },
  data () {
    return {
      apiTop: null,
      currentTime: null,
      lastUpdate: null
    }
  },
  computed: {
    lastBlockAgo () {
      if (!this.apiTop) { return null }
      return this.currentTime - this.apiTop.time
    },
    txCount () {
      if (!this.apiTop) return null
      return this.apiTop.transactions.length
    },
    minedBy () {
      if (!this.apiTop) return null
      if (!this.apiTop.transactions.length > 0) return null
      return this.apiTop.transactions[0].tx.account
    },
    autoUpdateIn () {
      if (!this.lastUpdate) return '...'
      if (!this.currentTime) return '...'
      return Math.round((this.currentTime - this.lastUpdate) / 1000)
    }
  },
  methods: {
    getLatestBlock () {
      this.$http.get('internal/v2/block/latest?tx_encoding=json', {
        before (request) {
          if (this.previousRequest) {
            this.previousRequest.abort()
          }
          this.previousRequest = request
        }

      }).then(response => {
        this.apiTop = response.body
        this.lastUpdate = new Date()
      }, response => {
        // error callback
      })
    }
  },
  created () {
    this.getLatestBlock()
    setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
    setInterval(() => {
      this.getLatestBlock()
    }, 9000)
  }
}
</script>
<style src='./latestBlock.scss' lang='scss' />
