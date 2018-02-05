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

      <div class='transaction-list'>
        <div v-for='t in apiTransactions' class='transaction'>
          <template v-if='t.tx.type === "coinbase"'>
            <div>
              <span class='field-name'>type</span>
              Coinbase
            </div>
            <div>
              <!----->
            </div>
            <div>
              <span class='field-name'>receiver</span>
              <span class="account-address">
                <router-link :to='"/account/" + t.tx.account'>
                  {{t.tx.account | startAndEnd}}
                </router-link>
              </span>
            </div>
            <div>
              <span class='field-name'>amount</span>
              block reward
            </div>
            <div>
              <span class='field-name'>no fee</span>
            </div>
          </template>
          <template v-else-if='t.tx.type === "spend"'>
            <div>
              <span class='field-name'>type</span>
              Spend
            </div>
            <div>
              <span class='field-name'>sender</span>
              <div class="account-address">
                <router-link :to='"/account/" + t.tx.sender'>
                  {{t.tx.sender| startAndEnd}}
                </router-link>
              </div>
            </div>
            <div>
              <span class='field-name'>recipient</span>
              <div class="account-address">
                <router-link :to='"/account/" + t.tx.recipient'>
                  {{t.tx.recipient| startAndEnd}}
                </router-link>
              </div>
            </div>
            <div>
              <span class='field-name'>amount</span>
              <span class='number'>{{ t.tx.amount }}</span>
              <span class="unit">AE</span>
            </div>
            <div>
              <span class='field-name'>fee</span>
              <span class='number'>{{ t.tx.fee }}</span>
              <span class="unit">AE</span>
            </div>
          </template>
          <template v-else-if='t.tx.type === "oracleregister"'>
            <div>
              <span class='field-name'>type</span>
              OracleRegister
            </div>
            <div>
              <span class='field-name'>account</span>
              <div class="account-address">
                <router-link :to='"/account/" + t.tx.account'>
                  {{t.tx.account | startAndEnd}}
                </router-link>
              </div>
            </div>
            <div>
              <span class='field-name'>fee</span>
              <span class='number'>{{ t.tx.fee }}</span>
              <span class="unit">AE</span>
            </div>
          </template>
          <template v-else>
            {{t}}
          </template>
          <div>
            <span class='field-name'>block</span>
            n/a
          </div>
        </div>
      </div>
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
      this.$http.get(`internal/v2/block/txs/list/height?from=${from}&to=${this.to}&tx_encoding=json`
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
<style src='./transaction.scss' lang='scss' />
