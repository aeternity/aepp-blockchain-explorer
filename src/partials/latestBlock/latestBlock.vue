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
<style>
.latest-block-partial {
  background:white;
  margin-top:80px;
}
.latest-block-partial > .grid {
  margin:0 auto;
  max-width:1040px;
  width:calc(100% - 40px);
}
.latest-block-partial .last-block-ago .number {
  font-size:50px;
}
.latest-block-partial .last-block-ago .unit {
  font-size:18px;
}
.latest-block-partial .explanation {
  padding:50px 100px 50px 0;
  max-width:250px;
}
.latest-block-partial .explanation .title {
  margin-top:0;
  font-size:40px;
}
.latest-block-partial .block-data {
  /* Rectangle 3: */
  flex-grow:1;
  background: #311B58;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.11);
  border-radius: 10px;
  color:white;
  padding:50px;
  margin-top:-40px;
  margin-bottom:-40px;
}
.latest-block-partial .block-data .grid {
  justify-content:space-between;
  align-items:flex-end;
}
.latest-block-partial .block-basic-info {
  line-height:40px;
  vertical-align:bottom;
  border-bottom:2px solid #F5F5F5;
  padding-bottom:20px;
  margin-bottom:20px;
}
.chain-height {
  font-size:30px;
}
.latest-block-partial .field {
  margin-bottom:20px;
}
.latest-block-partial .field-name {
  font-size:14px;
  opacity:0.4;
}
.latest-block-partial .field-value {
  margin-top:5px;
  font-size:24px;
}
.latest-block-partial .account-address {
  color:#F7296E;
}

</style>
