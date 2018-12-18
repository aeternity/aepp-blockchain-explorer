<template>
  <div
    :class="transaction.tx.type"
    class="transaction"
  >
    <div class="body">
      <Component
        :is="transaction.tx.type"
        v-if="transaction.tx.type"
        :transaction="transaction"
      />
      <template v-else>
        {{ transaction }}
      </template>
    </div>
  </div>
</template>
<script>
import { AeBadge } from '@aeternity/aepp-components'
import NamedAddress from '../namedAddress.vue'
import AeHash from '../aeHash.vue'
import Field from '../field.vue'

import SpendTx from './spendTx.vue'
import OracleRegisterTx from './oracleRegisterTx.vue'
import OracleResponseTx from './oracleResponseTx.vue'
import OracleQueryTx from './oracleQueryTx.vue'
import OracleExtendTx from './oracleExtendTx.vue'
import NameUpdateTx from './nameUpdateTx.vue'
import NameClaimTx from './nameClaimTx.vue'
import NamePreclaimTx from './namePreclaimTx.vue'
import ContractCallTx from './contractCallTx.vue'
import ContractCreateTx from './contractCreateTx.vue'

export default {
  name: 'Transaction',
  components: {
    AeBadge,
    NamedAddress,
    Field,
    AeHash,
    SpendTx,
    OracleRegisterTx,
    OracleResponseTx,
    OracleQueryTx,
    OracleExtendTx,
    NameUpdateTx,
    NameClaimTx,
    NamePreclaimTx,
    ContractCallTx,
    ContractCreateTx
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  computed: {
    responsePrettyJson () {
      if (!this.transaction) return null
      if (!this.transaction.tx.response) return null
      try {
        return JSON.parse(this.transaction.tx.response)
      } catch (e) {
        return null
      }
    }
  }
}
</script>
<style src='./transaction.scss' lang='scss' />
