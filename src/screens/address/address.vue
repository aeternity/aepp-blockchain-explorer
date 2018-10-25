<template>
  <div class="account-screen screen">
    <header class="header" >
      <h1 class="title">
        <ae-identity-avatar :address="address" v-if="account"/>
        <ae-identity-avatar :address="'0'" v-else/>
        <named-address v-if="account" :address="address"/>
        <div v-else class="fill-dummy-grey-big">&nbsp;</div>
      </h1>

      <field name="Balance">
        <span class="number" v-if="account">{{ account.balance }}</span>
        <span class="fill-dummy-grey-small" v-else>&nbsp;</span>
        <span class="unit">AE</span>
      </field>

      <field class="pubkey" name="Public Key">
        <div class="account-public-key" v-if="account">
          <ae-address :address="address"/>
        </div>
        <div v-else class="fill-dummy-grey-big">&nbsp;</div>
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
