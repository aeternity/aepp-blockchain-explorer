<template>
  <div>
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

export default {
  name: 'NameClaimTx',
  components: { Field },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
