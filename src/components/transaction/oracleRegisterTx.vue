<template>
  <div>
    <div class="grid">
      <Field name="Account">
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.accountId">
            <NamedAddress :address="transaction.tx.accountId" />
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
  name: 'OracleRegisterTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
