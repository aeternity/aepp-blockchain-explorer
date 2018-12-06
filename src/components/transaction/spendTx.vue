<template>
  <div>
    <div class="grid">
      <Field name="sender">
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.senderId">
            <NamedAddress :address="transaction.tx.senderId" />
          </RouterLink>
        </div>
      </Field>
      <Field name="recipient">
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.recipientId">
            <NamedAddress :address="transaction.tx.recipientId" />
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
  name: 'SpendTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
