<template>
  <div>
    <Field
      v-if="transaction.tx.nameHash"
      name="Name Hash"
    >
      <AeHash
        :hash="transaction.tx.nameHash"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.nameHash" />
    </Field>

    <Field
      v-if="transaction.tx.nameTtl"
      name="Name TTL"
    >
      {{ transaction.tx.nameTtl }}
    </Field>

    <div v-if="transaction.tx.pointers">
      <h2>Pointers</h2>
      <Field
        v-for="(pointer, key) in transaction.tx.pointers"
        :key="key"
        :name="`${key}`"
      >
        <AeHash
          :hash="pointer"
          type="short"
        />
        <ViewAndCopy :text="pointer" />
      </Field>
    </div>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'NameUpdateTx',
  components: { Field, AeHash, ViewAndCopy },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
