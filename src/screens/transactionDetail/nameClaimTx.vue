<template>
  <div>
    <Field
      v-if="transaction.tx.accountId"
      name="Account"
    >
      <RouterLink :to="`/account/${transaction.tx.accountId}`">
        <NamedAddress
          :address="transaction.tx.accountId"
          size="short"
        />
      </RouterLink>
    </Field>
    <Field
      v-if="transaction.tx.name"
      name="Name"
    >
      {{ transaction.tx.name }}
    </Field>
    <Field
      v-if="transaction.tx.nameSalt"
      name="Name Salt"
    >
      {{ transaction.tx.nameSalt }}
    </Field>
  </div>
</template>
<script>
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'

export default {
  name: 'NameClaimTx',
  components: {
    Field,
    NamedAddress
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
