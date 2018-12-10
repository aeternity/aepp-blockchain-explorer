<template>
  <div>
    <Field
      v-if="transaction.tx.accountId"
      name="Account"
    >
      <RouterLink :to="&quot;/account/&quot; + transaction.tx.accountId">
        <NamedAddress :address='transaction.tx.accountId'/>
      </RouterLink>
    </Field>

    <Field
      v-if="transaction.tx.queryFormat"
      name="Name QueryFormat"
    >
      {{ transaction.tx.queryFormat }}
    </Field>

    <Field
      v-if="transaction.tx.responseFormat"
      name="Name ResponseFormat"
    >
      {{ transaction.tx.responseFormat }}
    </Field>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'
import NamedAddress from '../../components/namedAddress.vue'
export default {
  name: 'OracleRegisterTx',
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
