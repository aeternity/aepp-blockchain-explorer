<template>
  <div>

    <field
      v-if="transaction.tx.senderId"
      name="Sender">
      <router-link :to="`/account/${transaction.tx.senderId}`">
        <named-address
          :address="transaction.tx.senderId"
          size="short"/>
      </router-link>
      <view-and-copy :text="transaction.tx.senderId"/>
    </field>

    <field
      v-if="transaction.tx.recipientId"
      name="Recipient">
      <router-link :to="`/account/${transaction.tx.recipientId}`">
        <named-address
          :address="transaction.tx.recipientId"
          size="short"/>
      </router-link>
      <view-and-copy :text="transaction.tx.recipientId"/>
    </field>

    <field
      v-if="transaction.tx.amount"
      name="Amount">
      {{ transaction.tx.amount | yaniToAe }} AE
    </field>

  </div>
</template>
<script>
import Field from '../../components/field'
import NamedAddress from '../../components/namedAddress'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'SpendTx',
  components: { Field, NamedAddress, ViewAndCopy },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
