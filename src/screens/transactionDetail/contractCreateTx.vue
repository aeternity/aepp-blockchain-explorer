<template>
  <div>
    <Field
      v-if="transaction.tx.ownerId"
      name="Account"
    >
      <RouterLink :to="`/account/${transaction.tx.ownerId}`">
        <NamedAddress
          :address="transaction.tx.ownerId"
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

    <Field name="Contract Code">
      <ContractCode :contract-code="transaction.tx.code" />
    </Field>
    <Field name="Call Data">
      <CodeView :code="transaction.tx.callData " />
    </Field>
  </div>
</template>
<script>
import ContractCode from '../../components/contractCode.vue'
import CodeView from '../../components/codeView.vue'
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'

export default {
  name: 'ContractCreateTx',
  components: {
    CodeView,
    ContractCode,
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
