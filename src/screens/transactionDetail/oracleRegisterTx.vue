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

    <Field
      v-if="transaction.tx.queryFormat"
      name="QueryFormat"
    >
      {{ transaction.tx.queryFormat }}
    </Field>

    <Field
      v-if="transaction.tx.responseFormat"
      name="ResponseFormat"
    >
      {{ transaction.tx.responseFormat }}
    </Field>
    <Field name="Fee">
      <div class="number">
        {{ transaction.tx.fee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field name="Oracle ttl">
      <div class="number">
        {{ transaction.tx.oracleTtl.value }}
      </div>
    </Field>
    <Field name="Query fee">
      <div class="number">
        {{ transaction.tx.queryFee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field name="Vm version">
      <div class="number">
        {{ transaction.tx.vmVersion }}
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
import NamedAddress from '../../components/namedAddress.vue'
import ViewAndCopy from '../../components/viewAndCopy'
import FillDummy from '../../components/fillDummy'
export default {
  name: 'OracleRegisterTx',
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
