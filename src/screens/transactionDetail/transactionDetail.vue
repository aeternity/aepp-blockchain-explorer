<template>
  <div class="transaction-detail-screen screen">
    <div class="inner">
      <div>
        <h1 class='title'>Transaction Detail</h1>
        <tx-type v-if='transaction' type='h2' :txtype='transaction.tx.type'/>
        <div v-if='transaction'>

          <field v-if='transaction.tx.type' name="Type">
            <tx-type type='badge' :txtype='transaction.tx.type'/>
          </field>

          <field v-if='transaction.hash' name="Hash">
            <ae-hash type='short' :hash='transaction.hash'/>
            <view-and-copy :text='transaction.hash'/>
          </field>

          <field v-if='transaction.tx.fee' name="Fee">
            {{transaction.tx.fee}}
          </field>

          <field v-if='transaction.tx.nonce' name="Nonce">
            {{transaction.tx.nonce}}
          </field>

          <field v-if='transaction.block_hash' name="Block Hash">
            <router-link :to='`/block/${transaction.block_hash}`'>
              <ae-hash type='short' :hash='transaction.block_hash'/>
            </router-link>
            <view-and-copy :text='transaction.block_hash'/>
          </field>

          <field v-if='transaction.block_height' name="Block Height">
            <router-link :to='`/block/${transaction.block_height}`'>
              {{transaction.block_height}}
            </router-link>
          </field>

          <field v-if='transaction.tx.account' name="Account">
            <router-link :to='`/account/${transaction.tx.account}`'>
              <named-address size='short' :address='transaction.tx.account'/>
            </router-link>
            <view-and-copy :text='transaction.tx.account'/>
          </field>


          <field v-if='transaction.tx.data_schema' name='Data Schema'>
            {{transaction.tx.data_schema}}
          </field>

          <field v-if='transaction.tx.reward' name="Reward">
            {{transaction.tx.reward}}
          </field>

          <field v-if='transaction.tx.vsn' name="Vsn">
            {{transaction.tx.vsn}}
          </field>

          <field v-if='transaction.tx.commitment' name="Commitment">
            {{transaction.tx.commitment}}
          </field>

          <field v-if='transaction.tx.name' name="Name">
            {{transaction.tx.name}}
          </field>

          <field v-if='transaction.tx.name_hash' name="Name Hash">
            <ae-hash type='short' :hash='transaction.tx.name_hash'/>
            <view-and-copy :text='transaction.tx.name_hash' />
          </field>

          <field v-if='transaction.tx.name_salt' name="Name Salt">
            {{transaction.tx.name_salt}}
          </field>

          <field v-if='transaction.tx.name_ttl' name="Name TTL">
            {{transaction.tx.name_ttl}}
          </field>

          <field v-if='transaction.tx.recipient' name="Recipient">
            <router-link :to='`/account/${transaction.tx.recipient}`'>
              <named-address size='short' :address='transaction.tx.recipient'/>
            </router-link>
            <view-and-copy :text='transaction.tx.recipient'/>
          </field>

          <field v-if='transaction.tx.sender' name="Sender">
            <router-link :to='`/account/${transaction.tx.sender}`'>
              <named-address size='short' :address='transaction.tx.sender'/>
            </router-link>
            <view-and-copy :text='transaction.tx.sender'/>
          </field>

          <field v-if='transaction.tx.amount' name="Amount">
            {{transaction.tx.amount}}
          </field>

          <field v-if='transaction.tx.ttl' name="TTL">
            {{transaction.tx.ttl}}
          </field>

          <div v-if='transaction.tx.pointers'>
            <h2>Pointers</h2>
            <field :name="`${key}`" :key="key" v-for='pointer, key in transaction.tx.pointers'>
              <ae-hash type='short' :hash='pointer' />
              <view-and-copy :text='pointer'/>
            </field>
          </div>

          <div v-if='transaction.tx.pointers'>
            <h2>Signatures</h2>
            <field :name="`${n}`" :key='n' v-for='signature, n in transaction.signatures'>
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
import { mapState } from 'vuex'
import {
  AeAddress,
  AeBadge
} from '@aeternity/aepp-components'
import AeHash from '../../components/aeHash/aeHash.vue'
import Field from '../../components/field/field.vue'
import TxType from '../../components/txType/txType.vue'
import NamedAddress from '../../components/namedAddress/namedAddress.vue'
import ViewAndCopy from '../../components/viewAndCopy/viewAndCopy.vue'
export default {
  name: 'transaction-detail',
  props: ['txId'],
  components: {
    AeAddress,
    AeBadge,
    AeHash,
    NamedAddress,
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
