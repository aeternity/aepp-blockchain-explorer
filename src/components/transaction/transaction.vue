<template>
  <div
    :class="transaction.tx.type"
    class="transaction">
    <div class="header">
      <field>
        <ae-badge>{{ transaction.tx.type | txTypeToName }}</ae-badge>
      </field>

      <field
        v-if="transaction.tx.nonce"
        name="nonce">
        <div class="number">
          {{ transaction.tx.nonce }}
        </div>
      </field>

      <field
        v-if="transaction.tx.fee"
        name="fee">
        <div>
          <span class="number">{{ transaction.tx.fee | yaniToAe }}</span>
          <span class="unit">AE</span>
        </div>
      </field>
      <field name="block">
        <div class="number">
          <router-link
            v-if="transaction.blockHeight"
            :to="&quot;/block/&quot; + transaction.blockHeight">
            {{ transaction.blockHeight }}
          </router-link>
          <template v-else>
            n/a
          </template>
        </div>
      </field>
      <field
        v-if="transaction.hash"
        name="tx hash">
        <router-link :to="&quot;/tx/&quot; + transaction.hash">
          <ae-hash
            :hash="transaction.hash"
            type="short"/>
        </router-link>
      </field>
    </div>
    <div class="body">

      <component
        v-if="transaction.tx.type"
        :is="transaction.tx.type"
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
import txTypeToName from '../../filters/txTypeToName'

import SpendTx from './spendTx.vue'
import OracleRegisterTx from './oracleRegisterTx.vue'
import OracleResponseTx from './oracleResponseTx.vue'
import OracleQueryTx from './oracleQueryTx.vue'
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
    NameUpdateTx,
    NameClaimTx,
    NamePreclaimTx,
    ContractCallTx,
    ContractCreateTx
  },
  filters: { txTypeToName },
  props: [
    'transaction'
  ],
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
