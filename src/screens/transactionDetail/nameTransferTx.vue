<template>
  <div>
    <Field
      v-if="transaction.tx.nameHash"
      name="Name Hash"
    >
      <AeHash
        :hash="transaction.tx.nameHash"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.nameHash" />
    </Field>
    <Field
      v-if="transaction.tx.recipientPubkey"
      name="recipientPubkey"
    >
      <RouterLink :to="`/account/${transaction.tx.recipientPubkey}`">
        <NamedAddress
          :address="transaction.tx.recipientPubkey"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy :text="transaction.tx.recipientPubkey" />
    </Field>
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
