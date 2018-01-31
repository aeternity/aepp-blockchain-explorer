<template>
  <div class="latest-block-partial">
    <div class="grid" v-if='apiTop'>
      <div class="explanation">
        <h2 class='title'>Latest Block</h2>
        <router-link :to='"/block/" + apiTop.height'>
          view last
        </router-link>
        <router-link to='/blocks'>
          view all
        </router-link>
      </div>
      <div class="block-data">
        <div class="grid block-basic-info">
          <div class='number chain-height'>
            <img src="@/assets/block.svg" alt=""/>
            <router-link :to="'/block/'+apiTop.height">
            {{apiTop.height}}
            </router-link>
          </div>
          <div>
            mined
            <span class='last-block-ago' v-html='$options.filters.agoFormat(lastBlockAgo)'/> ago
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
                {{apiTxCount}}
            </div>
          </div>
          <div class='field'>
            <div class='field-name'>Mined by</div>
            <div class="field-value account-address">
              <router-link :to='"/account/" + apiTxCoinBase.transaction.tx.account'>
              {{apiTxCoinBase.transaction.tx.account | startAndEnd }}
              </router-link>
            </div>
          </div>
        </div>
        <button @click='getTop'>refresh</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      apiTop: null,
      apiTxCount: null,
      apiTxCoinBase: null,
      currentTime: null
    }
  },
  computed: {
    lastBlockAgo () {
      if (!this.apiTop) { return null }
      return this.currentTime - this.apiTop.time
    }
  },
  methods: {
    getTop () {
      this.$http.get('external/v2/top', {
        before (request) {
          if (this.previousRequest) {
            this.previousRequest.abort()
          }
          this.previousRequest = request
        }

      }).then(response => {
        this.apiTop = response.body
      }, response => {
        // error callback
      })
    },
    getTxCount () {
      this.$http.get(
      'internal/v2/block/txs/count/latest'
      ).then(resp => {
        this.apiTxCount = resp.body.count
      }, resp => {
        alert('error')
      })
    },
    getCoinBaseTx () {
      this.$http.get(
      'internal/v2/block/tx/latest/1?tx_objects=true'
      ).then(resp => {
        this.apiTxCoinBase = resp.body
      }, resp => {
        alert('error')
      })
    }
  },
  created () {
    this.getTop()
    this.getCoinBaseTx()
    this.getTxCount()
    setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  }
}
</script>
<style src='./latestBlock.scss' lang='scss' />
