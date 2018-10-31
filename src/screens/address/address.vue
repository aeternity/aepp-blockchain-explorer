<template>
  <div class="account-screen screen">
    <header class="header" >
      <h1 class="title">
        <ae-identity-avatar :address="address" v-if="account"/>
        <ae-identity-avatar :address="'0'" v-else/>
        <named-address v-if="account" :address="address"/>
        <fill-dummy color="grey" size="big" v-else/>
      </h1>

      <field name="Balance">
        <span class="number" v-if="account">{{ account.balance }}</span>
        <fill-dummy color="grey" size="small" v-else/>
        <span class="unit">AE</span>
      </field>

      <field class="pubkey" name="Public Key">
        <div class="account-public-key" v-if="account">
          <ae-address :address="address"/>
        </div>
        <fill-dummy color="grey" size="big" v-else/>
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
  props: ['address'],
  components: {
    AeAddress,
    AeIdentityAvatar,
    AePanel,
    NamedAddress,
    Field,
    FillDummy
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
