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
      v-if="transaction.tx.response"
      name="Name QueryFormat"
    >
      {{ transaction.tx.response }}
    </Field>
  </div>
</template>
<script>
import Field from '../../components/field'
import NamedAddress from '../../components/namedAddress.vue'
export default {
  name: 'OracleResponseTx',
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
