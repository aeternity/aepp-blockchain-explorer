<template>
  <div>
    <Field
      v-if="transaction.tx.oracleId"
      name="Account"
    >
      <RouterLink :to="&quot;/account/&quot; + transaction.tx.oracleId">
        <NamedAddress :address='transaction.tx.oracleId'/>
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
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'
import NamedAddress from '../../components/namedAddress.vue'
export default {
  name: 'OracleQueryTx',
  components: {
    Field,
    AeHash,
    ViewAndCopy,
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
