<template>
  <div>
    <div class="grid">
      <Field name="account">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.accountId">
          <NamedAddress :address="transaction.tx.accountId" />
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
  name: 'NamePreclaimTx',
  components: { Field, NamedAddress, AeHash },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
