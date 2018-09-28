<template>
  <div class="account-screen screen">
    <header class="header" v-if="account">
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
    <div v-else>
      <loader/>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AeAddress, AeIdentityAvatar, AePanel } from '@aeternity/aepp-components'
import pollAction from '../../mixins/pollAction'
import NamedAddress from '../../components/namedAddress'
import Field from '../../components/field'
import Loader from '../../components/loader'

// TODO: There is a reactivity problem in here, The v-if does not work
export default {
  name: 'Address',
  props: ['address'],
  components: {
    AeAddress,
    AeIdentityAvatar,
    AePanel,
    NamedAddress,
    Field,
    Loader
  },
  mixins: [pollAction('accounts/get', ({ address }) => address)],
  computed: mapState('accounts', {
    'account': function (state) {
      return state.accounts[this.address]
    }
  })
}
</script>
<style src='./address.scss' lang='scss' />
