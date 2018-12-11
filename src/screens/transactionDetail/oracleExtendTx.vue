<template>
  <div>
    <Field
      v-if="transaction.tx.oracleId"
      name="Oracle"
    >
      <AeHash
        :hash="transaction.tx.oracleId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.oracleId" />
    </Field>
    <Field
      v-if="transaction"
      name="Oracle ttl"
    >
      <div class="number">
        {{ transaction.tx.oracleTtl.value }}
      </div>
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
import ViewAndCopy from '../../components/viewAndCopy'
import AeHash from '../../components/aeHash'

export default {
  name: 'OracleExtendTx',
  components: {
    Field,
    ViewAndCopy,
    AeHash
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
