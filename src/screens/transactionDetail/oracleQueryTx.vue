<template>
  <div>
    <Field
      v-if="transaction.tx.oracleId"
      name="Account"
    >
      <RouterLink :to="&quot;/account/&quot; + transaction.tx.oracleId">
        <NamedAddress :address="transaction.tx.oracleId" />
      </RouterLink>
    </Field>

    <Field
      v-if="transaction.tx.query"
      name="Name Query"
    >
      {{ transaction.tx.query }}
    </Field>
  </div>
</template>
<script>
import Field from '../../components/field'
import NamedAddress from '../../components/namedAddress.vue'
export default {
  name: 'OracleQueryTx',
  components: {
    Field,
    NamedAddress
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
