<template>
  <div>
    <div class="grid">
      <Field name="account">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.account">
          <NamedAddress :address="transaction.tx.account" />
        </RouterLink>
      </Field>
      <Field name="name">
        {{ transaction.tx.name }}
      </Field>
      <Field name="name_salt">
        {{ transaction.tx.name_salt }}
      </Field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'

export default {
  name: 'NameClaimTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
