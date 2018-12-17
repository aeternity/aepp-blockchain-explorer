<template>
  <div>
    <div class="grid">
      <Field name="Sender">
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.senderId">
            <NamedAddress :address="transaction.tx.senderId" />
          </RouterLink>
        </div>
      </Field>
      <Field name="Oracle">
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.oracleId">
            <NamedAddress :address="transaction.tx.oracleId" />
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
  name: 'OracleQueryTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
