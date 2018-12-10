<template>
  <div>
    <Field
      v-if="transaction.tx.accountId"
      name="Account"
    >
      <RouterLink :to="&quot;/account/&quot; + transaction.tx.accountId">
        <NamedAddress :address="transaction.tx.accountId" />
      </RouterLink>
    </Field>
    <Field
      v-if="transaction.tx.nameId"
      name="Name Hash"
    >
      <AeHash
        :hash="transaction.tx.nameId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.nameId" />
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
          :hash="pointer.id"
          type="short"
        />
        <ViewAndCopy :text="pointer.id" />
      </Field>
    </div>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'
import NamedAddress from '../../components/namedAddress.vue'

export default {
  name: 'NameUpdateTx',
  components: {
    Field,
    AeHash,
    ViewAndCopy,
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
