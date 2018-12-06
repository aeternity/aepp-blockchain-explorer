<template>
  <div>
    <div class="grid">
      <Field
        v-if="transaction.tx.owner"
        name="Account"
      >
        <RouterLink :to="`/account/${transaction.tx.owner}`">
          <NamedAddress
            :address="transaction.tx.owner"
            size="short"
          />
        </RouterLink>
      </Field>
      <Field name="TTL">
        <div class="number">
          {{ transaction.tx.ttl }}
        </div>
      </Field>
      <Field name="Deposit">
        <span class="number">
          {{ transaction.tx.deposit | yaniToAe }}
        </span>
        <span class="unit">
          AE
        </span>
      </Field>
      <Field name="Gas">
        {{ transaction.tx.gas }}
      </Field>
      <Field name="Gas price">
        {{ transaction.tx.gasPrice }}
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
