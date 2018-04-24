<template>
  <div class="transaction-detail-screen screen">
    <div class="inner">
      <div>
        <h1 class='title'>Transaction Detail</h1>
        <tx-type v-if='transaction' type='h2' :txtype='transaction.tx.type'/>
        <div v-if='transaction'>
          <field name="Type">
            <tx-type type='badge' :txtype='transaction.tx.type'/>
          </field>

          <field name="Hash">
            <router-link :to='`/block/${transaction.block_hash}`'>
              <ae-hash type='short' :hash='transaction.block_hash'/>
            </router-link>
            <view-and-copy :text='transaction.block_hash'/>
          </field>

          <field name="Account">
            <router-link :to='`/account/${transaction.tx.account}`'>
              <ae-address size='short' :address='transaction.tx.account'/>
            </router-link>
            <view-and-copy :text='transaction.tx.account'/>
          </field>

          <field name="Block_height">
            <router-link :to='`/block/${transaction.block_height}`'>
              {{transaction.block_height}}
            </router-link>
          </field>

          <field name='Data Schema'>
            {{transaction.tx.data_schema}}
          </field>

          <field name="Reward">
            {{transaction.tx.reward}}
          </field>

          <field name="Vsn">
            {{transaction.tx.vsn}}
          </field>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  AeAddress,
  AeBadge
} from '@aeternity/aepp-components'
import AeHash from '../../components/aeHash/aeHash.vue'
import Field from '../../components/field/field.vue'
import TxType from '../../components/txType/txType.vue'
import ViewAndCopy from '../../components/viewAndCopy/viewAndCopy.vue'
export default {
  name: 'transaction-detail',
  props: ['txId'],
  components: {
    AeAddress,
    AeBadge,
    AeHash,
    Field,
    TxType,
    ViewAndCopy
  },
  computed: mapState({
    transaction (state) {
      if (!state.txs[this.ixId]) return null
      return state.txs[this.ixId].transaction
    }
  }),
  async mounted () {
    this.$store.dispatch('loadTx', this.txId)
  }
}
</script>
<style scoped lang='scss' src='./transactionDetail.scss'/>
