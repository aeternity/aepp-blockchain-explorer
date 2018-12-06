<template>
  <div>
    <Field
      v-if="transaction.tx.senderId"
      name="Sender"
    >
      <RouterLink :to="`/account/${transaction.tx.senderId}`">
        <NamedAddress
          :address="transaction.tx.senderId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy :text="transaction.tx.senderId" />
    </Field>

    <Field
      v-if="transaction.tx.recipientId"
      name="Recipient"
    >
      <RouterLink :to="`/account/${transaction.tx.recipientId}`">
        <NamedAddress
          :address="transaction.tx.recipientId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy :text="transaction.tx.recipientId" />
    </Field>

    <Field
      v-if="transaction.tx.amount"
      name="Amount"
    >
      {{ transaction.tx.amount | yaniToAe }} AE
    </Field>
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
