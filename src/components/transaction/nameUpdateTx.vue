<template>
  <div>
    <div class="grid">
      <Field name="Account">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.accountId">
          <NamedAddress :address="transaction.tx.accountId" />
        </RouterLink>
      </Field>
      <Field name="Name">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.nameId">
          <NamedAddress :address="transaction.tx.nameId" />
        </RouterLink>
      </Field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'
import AeHash from '../aeHash'

export default {
  name: 'NameUpdateTx',
  components: { Field, NamedAddress, AeHash },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
