<template>
  <div>
    <div class="grid">
      <Field name="Owner">
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.ownerId">
            <NamedAddress :address="transaction.tx.ownerId" />
          </RouterLink>
        </div>
      </Field>
      <Field name="amount">
        <span class="number">
          {{ transaction.tx.amount | yaniToAe }}
        </span>
        <span class="unit">
          AE
        </span>
      </Field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'

export default {
  name: 'ContractCreateTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
