<template>
  <div>
    <Field
      v-if="transaction.tx.caller"
      name="Caller"
    >
      <RouterLink :to="`/account/${transaction.tx.caller}`">
        <NamedAddress
          :address="transaction.tx.caller"
          size="short"
        />
      </RouterLink>
    </Field>
    <Field
      v-if="transaction.contractId"
      name="Contract Id"
    >
      <AeHash
        :hash="transaction.contractId"
        type="short"
      />
      <ViewAndCopy :text="transaction.contractId" />
    </Field>
    <Field name="Gas">
      {{ transaction.tx.gas }}
    </Field>
    <Field name="Gas price">
      {{ transaction.tx.gasPrice }}
    </Field>
    <Field name="Gas Used">
      {{ transaction.tx.gas }}
    </Field>
    <Field name="VM Version">
      <CodeView :code="transaction.tx.vmVersion " />
    </Field>
    <Field name="Call Data">
      <CodeView :code="transaction.tx.callData " />
    </Field>
  </div>
</template>
<script>
import CodeView from '../../components/codeView.vue'
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy.vue'

export default {
  name: 'ContractCallTx',
  components: {
    CodeView,
    Field,
    NamedAddress,
    AeHash,
    ViewAndCopy
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
