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
      v-if="transaction.tx.commitmentId"
      name="Commitment"
    >
      <AeHash
        :hash="transaction.tx.commitmentId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.commitmentId" />
    </Field>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import NamedAddress from '../../components/namedAddress'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'NamePreclaimTx',
  components: { Field, AeHash, NamedAddress, ViewAndCopy },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
