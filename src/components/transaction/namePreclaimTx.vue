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

export default {
  name: 'NamePreclaimTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
