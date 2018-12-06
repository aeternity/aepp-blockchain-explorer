<template>
  <div>
    <field
      v-if="transaction.tx.nameHash"
      name="Name Hash">
      <ae-hash
        :hash="transaction.tx.nameHash"
        type="short" />
      <view-and-copy :text="transaction.tx.nameHash"/>
    </field>
    <field
      v-if="transaction.tx.recipientPubkey"
      name="recipientPubkey">
      <router-link :to="`/account/${transaction.tx.recipientPubkey}`">
        <named-address
          :address="transaction.tx.recipientPubkey"
          size="short"/>
      </router-link>
      <view-and-copy :text="transaction.tx.recipientPubkey"/>
    </field>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'
import NamedAddress from '../../components/namedAddress'

export default {
  name: 'NameTransferTx',
  components: { Field, AeHash, ViewAndCopy, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
