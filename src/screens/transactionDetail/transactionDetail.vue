<template>
  <div class="transaction-detail-screen screen">
    <div class="inner">
      <div v-if="transaction">
        <h1 class='title'>Transaction Detail</h1>
        <h2 v-if="transaction">{{ transaction.tx.type | txTypeToName }}</h2>
        <span class="fill-dummy-grey-big" v-else>&nbsp;</span>
        <div v-if='transaction'>

          <field name="Type">
            <ae-badge v-if='transaction.tx.type'>
              {{ transaction.tx.type | txTypeToName }}
            </ae-badge>
            <span class="fill-dummy-grey" v-else>&nbsp;</span>
          </field>

          <field name="Hash">
            <ae-hash type='short' :hash='transaction.hash' v-if='transaction.hash'/>
            <view-and-copy :text='transaction.hash' v-if='transaction.hash'/>
            <span class="fill-dummy-grey" v-else>&nbsp;</span>
          </field>

          <hr>

          <field v-if='transaction.tx.account' name="Account">
            <router-link :to='`/account/${transaction.tx.account}`'>
              <named-address size='short' :address='transaction.tx.account'/>
            </router-link>
            <view-and-copy :text='transaction.tx.account'/>
          </field>

          <component
            v-if="transaction.tx.type"
            :is="transaction.tx.type"
            :transaction="transaction"
          />

          <field v-if='transaction.tx.data_schema' name='Data Schema'>
            {{transaction.tx.data_schema}}
          </field>

          <field v-if='transaction.tx.reward' name="Reward">
            {{transaction.tx.reward}}
          </field>

          <hr>

          <field v-if='transaction.tx.nonce' name="Nonce">
            {{transaction.tx.nonce}}
          </field>

          <field v-if='transaction.tx.ttl' name="TTL">
            {{transaction.tx.ttl}}
          </field>

          <field v-if='transaction.tx.vsn' name="Vsn">
            {{transaction.tx.vsn}}
          </field>

          <div v-if='transaction.signatures'>
            <h3>Signatures</h3>
            <field :name="`${n}`" :key='n' v-for='(signature, n) in transaction.signatures'>
              <ae-hash type='short' :hash='signature' />
              <view-and-copy :text='signature'/>
            </field>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  AeAddress,
  AeBadge
} from '@aeternity/aepp-components'

import SpendTx from './spendTx.vue'
import OracleRegisterTx from './oracleRegisterTx.vue'
import OracleResponseTx from './oracleResponseTx.vue'
import OracleQueryTx from './oracleQueryTx.vue'
import NameClaimTx from './nameClaimTx.vue'
import NamePreclaimTx from './namePreclaimTx.vue'
import NameTransferTx from './nameTransferTx.vue'
import NameUpdateTx from './nameUpdateTx.vue'
import ContractCallTx from './contractCallTx.vue'
import ContractCreateTx from './contractCreateTx.vue'

import AeHash from '../../components/aeHash.vue'
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'
import ViewAndCopy from '../../components/viewAndCopy.vue'
import txTypeToName from '../../filters/txTypeToName'

export default {
  name: 'transaction-detail',
  props: ['txId'],
  components: {
    AeAddress,
    AeBadge,
    AeHash,
    NamedAddress,
    Field,
    ViewAndCopy,
    SpendTx,
    OracleRegisterTx,
    OracleResponseTx,
    OracleQueryTx,
    NameUpdateTx,
    NameClaimTx,
    NamePreclaimTx,
    NameTransferTx,
    ContractCallTx,
    ContractCreateTx
  },
  filters: { txTypeToName },
  computed: {
    ...mapGetters('transactions', [
      'getTxByHash'
    ]),
    transaction () {
      return this.getTxByHash(this.txId)
    }
  },
  async mounted () {
    return this.$store.dispatch('transactions/getTxByHash', this.txId)
  }
}
</script>
<style scoped lang='scss' src='./transactionDetail.scss'/>
