<template>
  <div>
    <Field
      v-if="transaction.tx.accountId"
      name="Account"
    >
      <RouterLink :to="&quot;/account/&quot; + transaction.tx.accountId">
        <NamedAddress :address="transaction.tx.accountId" />
      </RouterLink>
      <ViewAndCopy
        v-if="transaction"
        :text="transaction.tx.accountId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field name="Fee">
      <div class="number">
        {{ transaction.tx.fee }}
      </div>
    </Field>
    <Field name="Version">
      <div class="number">
        {{ transaction.tx.version }}
      </div>
    </Field>
  </div>
</template>
<script>
import Field from '../../components/field'
import NamedAddress from '../../components/namedAddress'
import ViewAndCopy from '../../components/viewAndCopy'
import FillDummy from '../../components/fillDummy'

export default {
  name: 'NamePreclaimTx',
  components: {
    Field,
    NamedAddress,
    ViewAndCopy,
    FillDummy
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
