<template>
  <div class="account-screen screen">
    <header class="header">
      <h1 class="title">
        <ae-identity-avatar :address="address"/>
        <named-address :address="address"/>
      </h1>

      <field name="Balance">
        <span class="number">{{ account ? account.balance : 0 }}</span>
        <span class="unit">AE</span>
      </field>

      <field class="pubkey" name="Public Key">
        <div class="account-public-key">
          <ae-address :address="address"/>
        </div>
      </field>
    </header>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AeAddress, AeIdentityAvatar, AePanel } from '@aeternity/aepp-components'
import polling from '../../functions/polling'

const poll = polling()

// TODO: There is a reactivity problem in here, The v-if does not work
export default {
  name: 'Address',
  props: ['address'],
  components: {
    AeAddress,
    AeIdentityAvatar,
    AePanel
  },
  computed: mapState('accounts', {
    'account': function (state) {
      return state.accounts[this.address]
    }
  }),
  beforeRouteEnter (to, from, next) {
    return next((vm) => poll.fetch.call(vm, 'accounts/get', to.params.address))
  },
  beforeRouteUpdate (to, from, next) {
    poll.close('accounts/get')
    poll.fetch.call(this, 'accounts/get', to.params.address)
    return next()
  },
  beforeRouteLeave (to, from, next) {
    return poll.close('accounts/get', () => next())
  }
}
</script>
<style src='./address.scss' lang='scss' />
