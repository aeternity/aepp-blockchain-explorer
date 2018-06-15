<template>
  <div v-if="account" class="account-screen screen">
    <header class="header">
      <h1 class="title">
        <ae-identity-avatar :address="address"/>
        <named-address :address="address"/>
      </h1>

      <field name="Balance">
        <span class="number">{{ account.balance }}</span>
        <span class="unit">AE</span>
      </field>

      <field class="pubkey" name="Public Key">
        <div class="account-public-key">
          <ae-address :address="address"/>
        </div>
      </field>
    </header>

    <h2>Transactions</h2>
    <div class="transactions">
      <transaction :key="t.hash" v-for="t in account.transactions" :transaction="t"/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AeAddress, AeIdentityAvatar, AePanel } from '@aeternity/aepp-components'
import pollAction from '../../mixins/pollAction'

// TODO: There is a reactivity problem in here, The v-if does not work
export default {
  /*
   * Name
   */
  name: 'Address',

  /*
   * Components
   */
  components: {
    AeAddress,
    AeIdentityAvatar,
    AePanel
  },

  /*
   * Props
   */
  props: [
    'address'
  ],

  /*
 * Mixins
 */
  mixins: [
    pollAction('accounts/get', function () { return this.address })
  ],

  /*
   * Computed Props
   */
  computed: mapState('accounts', {
    'account': function (state) {
      return state.accounts[this.address]
    }
  })
}
</script>
<style src='./address.scss' lang='scss' />
