<template>
  <div class="account-screen screen">
    <header class="header">
      <h1 class="title">
        <AeIdentityAvatar :address="account ? address : '0'" />
        <NamedAddress
          v-if="account"
          :address="address"
        />
        <FillDummy
          v-else
          color="grey"
          size="big"
        />
      </h1>

      <Field name="Balance">
        <span
          v-if="account"
          class="number"
        >
          {{ account.balance | yaniToAe }}
        </span>
        <FillDummy
          v-else
          color="grey"
          size="small"
        />
        <span class="unit">
          AE
        </span>
      </Field>

      <Field
        class="pubkey"
        name="Public Key"
      >
        <div
          v-if="account"
          class="account-public-key"
        >
          <AeAddress :address="address" />
        </div>
        <FillDummy
          v-else
          color="grey"
          size="big"
        />
      </Field>
    </header>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AeAddress, AeIdentityAvatar } from '@aeternity/aepp-components'
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
