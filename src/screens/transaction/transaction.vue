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

        <ae-button size='small' type='exciting' @click='reset'>
          load
        </ae-button>

      </div>

      <div class='transaction-list'>
        <ae-panel v-for='t in apiTransactions' :key='t.hash'>
          <transaction :transaction='t'/>
        </ae-panel>
      </div>
      <div class='center'>
        <ae-button type='exciting' @click='getTransactions' class="load-more">
          Load more
        </ae-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  AeButton,
  AePanel
} from '@aeternity/aepp-components'
import Transaction from '../../components/transaction/transaction.vue'
const paginationStep = 10
export default {
  components: {
    AeButton,
    AePanel,
    Transaction
  },
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
        this.to = from - 1
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
