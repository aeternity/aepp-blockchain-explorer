<template>
  <div :class='transaction.tx.type' class='transaction'>
    <div class="header">
      <field>
        <tx-type type='badge' :txtype=' transaction.tx.type '/>
      </field>

      <field name='nonce' v-if='transaction.tx.nonce'>
        <div class="number">
          {{ transaction.tx.nonce }}
        </div>
      </field>

      <field name='fee' v-if='transaction.tx.fee'>
        <div>
          <span class='number'>{{ transaction.tx.fee }}</span>
          <span class="unit">AE</span>
        </div>
      </field>
      <field name='block'>
        <div class='number'>
          <router-link v-if='transaction.blockHeight' :to='"/block/" + transaction.blockHeight'>
            {{ transaction.blockHeight }}
          </router-link>
          <template v-else>
            n/a
          </template>
        </div>
      </field>
      <field v-if='transaction.hash' name='tx hash'>
        <router-link :to='"/tx/" + transaction.hash'>
          <ae-hash type="short" :hash='transaction.hash'/>
        </router-link>
      </field>
    </div>
    <div class='body'>

      <component
        v-if="componentForTx"
        :is="componentForTx"
        :transaction="transaction"
      />
      <template v-else>
        {{transaction}}
      </template>

    </div>

  </div>
</template>
<script>
import NamedAddress from '../../components/namedAddress/namedAddress.vue'
import TxType from '../../components/txType/txType.vue'
import AeHash from '../../components/aeHash/aeHash.vue'
import Field from '../../components/field/field.vue'

import SpendTx from './spendTx.vue'
import OracleRegisterTx from './oracleRegisterTx.vue'
import OracleResponseTx from './oracleResponseTx.vue'
import OracleQueryTx from './oracleQueryTx.vue'
import NameUpdateTx from './nameUpdateTx.vue'
import NameClaimTx from './nameClaimTx.vue'
import NamePreclaimTx from './namePreclaimTx.vue'
import ContractCallTx from './contractCallTx.vue'
import ContractCreateTx from './contractCreateTx.vue'

const txTypesComponentsMap = {
  'contract_call_tx': ContractCallTx,
  'contract_create_tx': ContractCreateTx,
  'name_claim_tx': NameClaimTx,
  'name_preclaim_tx': NamePreclaimTx,
  'name_update_tx': NameUpdateTx,
  'oracle_query_tx': OracleQueryTx,
  'oracle_register_tx': OracleRegisterTx,
  'oracle_response_tx': OracleResponseTx,
  'spend_tx': SpendTx
}

export default {
  name: 'transaction',
  props: [
    'transaction'
  ],
  components: {
    NamedAddress,
    TxType,
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
  computed: {
    componentForTx () {
      return txTypesComponentsMap[ this.transaction.tx.type ]
    },
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
