<template>
  <div class="transaction-screen screen">
    <div class="inner">

      <h1 class='title'>Transactions</h1>
      <div class="grid">
        <div>
          load all transactions from block
        </div>
        <div>

        <input v-model='loadFrom' type="number" name="startBlock" id="startBlock"/>
        </div>
        <div>
          to: <span class='block-number number'>{{loadFrom - 10}}</span>
        </div>
        <button @click='reset'>load</button>
      </div>

      <table>
        <tr>
          <th>Block</th>
          <th>Type</th>
          <th>Sender</th>
          <th>Recipient</th>
          <th>Amount</th>
          <th>Fee</th>
        </tr>
        <tr v-for='t in apiTransactions'>
          <template v-if='t.tx.type === "CoinbaseTxObject"'>
            <td>n/a</td>
            <td>
              Coinbase
            </td>
            <td>
              -
            </td>
            <td>
              <div class="account-address">
              <router-link :to='"/account/" + t.tx.account'>
                {{t.tx.account | startAndEnd}}
              </router-link>
              </div>
            </td>
            <td>block reward</td>
            <td>-</td>
          </template>
          <template v-else-if='t.tx.type === "SpendTxObject"'>
            <th>n/a</th>
            <td>
              Spend
            </td>
            <td>
              <div class="account-address">
              <router-link :to='"/account/" + t.tx.sender'>
                {{t.tx.sender| startAndEnd}}
              </router-link>
              </div>
            </td>
            <td>
              <div class="account-address">
              <router-link :to='"/account/" + t.tx.recipient'>
                {{t.tx.recipient| startAndEnd}}
              </router-link>
              </div>
            </td>
            <td>
              <span class='number'>{{ t.tx.amount }}</span>
              <span class="unit">AE</span>
            </td>
            <td>
              <span class='number'>{{ t.tx.fee }}</span>
              <span class="unit">AE</span>
            </td>
          </template>
          <template v-else-if='t.tx.type === "OracleRegisterTxObject"'>
            <td>n/a</td>
            <td>OracleRegister</td>
            <td>
              <div class="account-address">
                <router-link :to='"/account/" + t.tx.account'>
                  {{t.tx.account | startAndEnd}}
                </router-link>
              </div>
            </td>
            <td>-</td>
            <td>-</td>
            <td>
              <span class='number'>{{ t.tx.fee }}</span>
              <span class="unit">AE</span>
            </td>
          </template>
          <template v-else>
            {{t}}
          </template>
        </tr>
      </table>
      <button @click='getTransactions' class="load-more">Load 10 blocks more</button>
    </div>
  </div>
</template>

<script>
const paginationStep = 10
export default {
  data () {
    return {
      blockHeight: null,
      loadFrom: 0,
      apiTransactions: [],
      to: null
    }
  },
  methods: {
    getTransactions () {
      let from = this.to - paginationStep
      if (from < 0) {
        from = 0
      }
      this.$http.get(`internal/v2/block/txs/list/height?from=${from}&to=${this.to}&tx_objects=true`
      ).then(resp => {
        this.apiTransactions = this.apiTransactions.concat(resp.body.transactions)
        this.to = from
      }, resp => {
        alert('Error')
      })
    },
    reset () {
      if (this.loadFrom > this.blockHeight) {
        this.loadFrom = this.blockHeight
      }
      if (this.loadFrom < paginationStep) {
        this.loadFrom = paginationStep
      }
      this.apiTransactions = []
      this.to = this.loadFrom
      this.getTransactions()
    }
  },
  created () {
    this.$http.get(`internal/v2/block/number`
    ).then(resp => {
      this.blockHeight = resp.body.height
      this.to = this.blockHeight
      this.loadFrom = this.blockHeight
      this.getTransactions()
    }, resp => {
    })
  }
}
</script>
<style>
.transaction-screen {
}
.transaction-screen .title {
  font-weight:normal;
  font-size:30px;
  border-bottom:2px solid #311B58;
  padding-bottom:20px;
  margin-bottom:20px;
}
.transaction-screen .inner {
  margin:0 auto;
  max-width:1040px;
  width:calc(100% - 40px);
}
.transaction-screen .grid {
  border-bottom:2px solid #F5F5F5;
  align-items:flex-end;
  padding-bottom:15px;
}
.transaction-screen .grid > *{
  padding-right:10px;
}
.load-more {
}
.transaction-screen .account-address {
  color:#F7296E;
}

</style>
