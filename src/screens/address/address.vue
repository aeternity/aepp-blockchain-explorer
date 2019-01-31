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
    <h2 v-if="account">
      Total transactions: {{ account.numTransactions }}
    </h2>
    <div
      v-if="account"
      class="transactions"
    >
      <Transaction
        v-for="t in transactions"
        :key="t.hash"
        :transaction="t"
      />
    </div>
    <div v-else>
      <div><FillDummy color="grey" /></div>
      <div>
        <FillDummy
          color="grey"
          size="big"
        />
      </div>
      <div>
        <FillDummy
          color="grey"
          size="big"
        />
      </div>
      <div>
        <FillDummy
          color="grey"
          size="big"
        />
      </div>
    </div>
    <div
      v-if="needMore"
      class="center"
    >
      <AeButton
        type="dramatic"
        size="small"
        @click="loadMore"
      >
        more txs
      </AeButton>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AeAddress, AeIdentityAvatar, AeButton } from '@aeternity/aepp-components'
import pollAction from '../../mixins/pollAction'
import NamedAddress from '../../components/namedAddress'
import Field from '../../components/field'
import FillDummy from '../../components/fillDummy'
import Transaction from '../../components/transaction/transaction'

export default {
  name: 'Address',
  components: {
    AeAddress,
    AeIdentityAvatar,
    NamedAddress,
    Field,
    FillDummy,
    Transaction,
    AeButton
  },
  mixins: [pollAction('accounts/get', ({ address }) => address)],
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      numTransactions: 10,
      increaseBy: 10
    }
  },
  computed: {
    ...mapState('accounts', {
      account (state) {
        return state.accounts[this.address]
      },
      transactions (state) {
        return state.accountTransactions[this.address]
      }
    }),
    needMore () {
      return this.account ? this.account.numTransactions > this.numTransactions : false
    }
  },
  mounted () {
    this.$store.dispatch('accounts/getTransactions', { 'address': this.address, 'transactionsToGet': this.numTransactions, 'increaseBy': this.increaseBy })
  },
  methods: {
    async loadMore () {
      this.numTransactions = Math.min(this.numTransactions + this.increaseBy, this.account.numTransactions)
      await this.$store.dispatch('accounts/getTransactions', { 'address': this.address, 'transactionsToGet': this.numTransactions, 'increaseBy': this.increaseBy })
    }
  }
}
</script>
<style src='./address.scss' lang='scss' />
