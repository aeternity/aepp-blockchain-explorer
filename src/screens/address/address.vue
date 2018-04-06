<template>
  <div v-if="account" class='account-screen screen'>
    <h1 class='title'>
      <ae-identity-avatar :address="address"/>
      <ae-address size='compact' :show-avatar='false' :address='address'/>
    </h1>

    <div class="field">
      <div class='field-name'>Balance</div>
      <div>
        <span class="number">{{account.balance}}</span>
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
    <ae-panel :key='t.hash' v-for='t in account.transactions'>
      <transaction :transaction='t'/>
    </ae-panel>

    <!--<h2>List of Transactions:</h2>-->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Transaction from '../../components/transaction/transaction.vue'
import pollAction from '../../mixins/pollAction'
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
  props: ['address'],
  mixins: [pollAction('fetchAccount', function () { return [this.address] })],
  computed: mapState({
    account (state) {
      return state.accounts[this.address]
    }
  })
}
</script>
<style src='./address.scss' lang='scss' />
