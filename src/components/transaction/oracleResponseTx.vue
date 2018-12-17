<template>
  <div>
    <div class="grid">
      <Field name="Oracle">
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.oracleId">
            <NamedAddress :address="transaction.tx.oracleId" />
          </RouterLink>
        </div>
      </Field>
      <Field name="Query">
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.queryId">
            <NamedAddress :address="transaction.tx.queryId" />
          </RouterLink>
        </div>
      </Field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'

export default {
  name: 'OracleResponseTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
