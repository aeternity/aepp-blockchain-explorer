<template>
  <div>
    <div class="grid">
      <Field name="Account">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.account">
          <NamedAddress :address="transaction.tx.account" />
        </RouterLink>
      </Field>
      <Field name="Name Hash">
        <AeHash
          :hash="transaction.tx.name_hash"
          type="short"
        />
      </Field>
      <Field name="Name TTL">
        {{ transaction.tx.name_ttl }}
      </Field>
      <Field name="TTL">
        {{ transaction.tx.ttl }}
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
