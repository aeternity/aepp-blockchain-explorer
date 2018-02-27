<template>
  <div class='account-screen screen'>
    <h1 class='title'>
      <ae-identity-avatar :address="address"/>
      <ae-address size='compact' :show-avatar='false' :address='address'/>
    </h1>

    <div class="field">
      <div class='field-name'>Balance</div>
      <div>
        <span class="number">{{balance}}</span>
        <span class="unit">AE</span>
      </div>
    </div>

    <div class="field">
      <div class="field-name">
        Public Key
      </div>
      <div class='account-address'>
        <ae-address :show-avatar='false' :address='address'/>
      </div>
    </div>
    <h2>Transactions</h2>
    <ae-panel :key='t.hash' v-for='t in transactions'>
      <transaction :transaction='t'/>
    </ae-panel>

    <!--<h2>List of Transactions:</h2>-->
  </div>
</template>
<script>
import Transaction from '../../components/transaction/transaction.vue'
import {
  AeAddress,
  AeIdentityAvatar,
  AePanel
} from '@aeternity/aepp-components'
export default {
  name: 'Address',
  components: {
    Transaction,
    AeAddress,
    AeIdentityAvatar,
    AePanel
  },
  data () {
    return {
      balance: null,
      transactions: null
    }
  },
  computed: {
    address () {
      return this.$route.params.address
    }
  },
  methods: {
    getBalance () {
      this.$http.get('internal/v2/account/balance/' + this.address, {
        before (request) {
          if (this.previousRequest) {
            this.previousRequest.abort()
          }
          this.previousRequest = request
        }

      }).then(response => {
        this.balance = response.body.balance
      }, response => {
        // error callback
      })
    },
    getTxs () {
      this.$http.get(`internal/v2/account/txs/${this.address}?tx_encoding=json`).then(response => {
        console.log(response.body)
        this.transactions = response.body.transactions
      }, response => {
        // error callback
      })
    }
  },
  created () {
    this.getBalance()
    this.getTxs()
  }
}
</script>
<style src='./address.scss' lang='scss' />
