<template>
  <div>
    <Field
      v-if="transaction.tx.commitment"
      name="Commitment"
    >
      <AeHash
        :hash="transaction.tx.commitment"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.commitment" />
    </Field>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'NamePreclaimTx',
  components: { Field, AeHash, ViewAndCopy },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
