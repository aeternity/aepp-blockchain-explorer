<template>
  <div>
    <Field
      v-if="transaction.tx.ownerId"
      name="Owner"
    >
      <RouterLink :to="`/account/${ transaction.tx.ownerId }`">
        <NamedAddress
          :address="transaction.tx.ownerId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy
        v-if="transaction"
        :text="transaction.tx.ownerId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field name="VmVersion">
      <div class="number">
        {{ transaction.tx.vmVersion }}
      </div>
    </Field>
    <Field name="Amount">
      <div class="number">
        {{ transaction.tx.amount }}
      </div>
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
      <div class="number">
        {{ transaction.tx.gasPrice | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field name="Contract Code">
      <ContractCode :contract-code="transaction.tx.code" />
    </Field>
    <Field name="Call Data">
      <CodeView :code="transaction.tx.callData " />
    </Field>
    <Field name="Fee">
      <div class="number">
        {{ transaction.tx.fee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field name="Version">
      <div class="number">
        {{ transaction.tx.version }}
      </div>
    </Field>
    <Field name="Vm version">
      <div class="number">
        {{ transaction.tx.vmVersion }}
      </div>
    </Field>
  </div>
</template>
<script>
import ContractCode from '../../components/contractCode.vue'
import CodeView from '../../components/codeView.vue'
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'
import ViewAndCopy from '../../components/viewAndCopy.vue'
import FillDummy from '../../components/fillDummy'

export default {
  name: 'ContractCreateTx',
  components: {
    Field,
    NamedAddress,
    ViewAndCopy,
    FillDummy,
    ContractCode,
    CodeView
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
