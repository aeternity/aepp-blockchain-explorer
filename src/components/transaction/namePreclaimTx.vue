<template>
  <div>
    <div class="grid">
      <Field name="account">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.account">
          <NamedAddress :address="transaction.tx.account" />
        </RouterLink>
      </Field>
      <Field name="commitment">
        <AeHash
          :hash="transaction.tx.commitment"
          type="short"
        />
      </Field>
      <Field name="fee">
        {{ transaction.tx.fee }}
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
