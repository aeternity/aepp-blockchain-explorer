<template>
  <div>
    <Field
      v-if="transaction.tx.oracleId"
      name="Sender"
    >
      <RouterLink :to="`/account/${transaction.tx.oracleId}`">
        <NamedAddress
          :address="transaction.tx.oracleId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy :text="transaction.tx.oracleId" />
    </Field>
  </div>
</template>
<script>
import Field from '../../components/field'
import NamedAddress from '../../components/namedAddress'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'OracleExtendTx',
  components: { Field, NamedAddress, ViewAndCopy },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
