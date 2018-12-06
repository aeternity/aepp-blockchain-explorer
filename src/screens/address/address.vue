<template>
  <div class="account-screen screen">
    <header class="header" >
      <h1 class="title">
        <ae-identity-avatar :address="account ? address : '0'"/>
        <named-address
          v-if="account"
          :address="address"/>
        <fill-dummy
          v-else
          color="grey"
          size="big"/>
      </h1>

      <field name="Balance">
        <span
          v-if="account"
          class="number">{{ account.balance | yaniToAe }}</span>
        <fill-dummy
          v-else
          color="grey"
          size="small"/>
        <span class="unit">AE</span>
      </field>

      <field
        class="pubkey"
        name="Public Key">
        <div
          v-if="account"
          class="account-public-key">
          <ae-address :address="address"/>
        </div>
        <fill-dummy
          v-else
          color="grey"
          size="big"/>
      </field>
    </header>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AeAddress, AeIdentityAvatar, AePanel } from '@aeternity/aepp-components'
import pollAction from '../../mixins/pollAction'
import NamedAddress from '../../components/namedAddress'
import Field from '../../components/field'
import FillDummy from '../../components/fillDummy'

// TODO: There is a reactivity problem in here, The v-if does not work
export default {
  name: 'Address',
  components: {
    AeAddress,
    AeIdentityAvatar,
    AePanel,
    NamedAddress,
    Field,
    FillDummy
  },
  mixins: [pollAction('accounts/get', ({ address }) => address)],
  props: {
    address: {
      type: String,
      required: true
    }
  },
  computed: mapState('accounts', {
    account (state) {
      return state.accounts[this.address]
    }
  })
}
</script>
<style src='./address.scss' lang='scss' />
