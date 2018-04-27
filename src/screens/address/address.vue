<template>
  <div v-if="account" class='account-screen screen'>
    <header class="header">
      <h1 class='title'>
        <ae-identity-avatar :address="address"/>
        <named-address :address='address'/>
      </h1>

      <field name="Balance">
        <span class="number">{{account.balance}}</span>
        <span class="unit">AE</span>
      </field>

      <field class='pubkey' name="Public Key">
        <div class='account-public-key'>
          <ae-address :address='address'/>
        </div>
      </field>
    </header>

    <h2>Transactions</h2>
    <div class="transactions">
      <transaction :key='t.hash' v-for='t in account.transactions' :transaction='t'/>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import Transaction from '../../components/transaction/transaction.vue'
import NamedAddress from '../../components/namedAddress/namedAddress.vue'
import ViewAndCopy from '../../components/viewAndCopy/viewAndCopy.vue'
import Field from '../../components/field/field.vue'
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
    Field,
    ViewAndCopy,
    NamedAddress,
    AeAddress,
    AeIdentityAvatar,
    AePanel
  },
  props: ['address'],
  mixins: [
    pollAction('fetchAccount', function () { return [this.address] }),
    pollAction('fetchAccountName', function () { return this.address })
  ],
  computed: mapState({
    account (state) {
      return state.accounts[this.address]
    },
    env: state => state.env
  })
}
</script>
<style src='./address.scss' lang='scss' />
