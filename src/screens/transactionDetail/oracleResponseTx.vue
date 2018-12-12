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
      v-if="transaction.tx.queryId"
      name="Query"
    >
      <AeHash
        :hash="transaction.tx.queryId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.queryId" />
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

    <Field
      v-if="transaction.tx.response"
      name="Response"
    >
      {{ transaction.tx.response }}
    </Field>
    <Field name="Fee">
      <div class="number">
        {{ transaction.tx.fee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field name="Response ttl">
      <div class="number">
        {{ transaction.tx.responseTtl.value }}
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
  name: 'OracleResponseTx',
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
