<template>
  <div>
    <div class="grid">
      <Field>
        <div class="field-name">
          Oracle
        </div>
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.oracle">
            {{ transaction.tx.oracle | startAndEnd }}
          </RouterLink>
        </div>
      </Field>
      <Field>
        <div class="field-name">
          sender
        </div>
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.sender">
            {{ transaction.tx.sender | startAndEnd }}
          </RouterLink>
        </div>
      </Field>
    </div>
    <div class="grid">
      <Field>
        <div class="field-name">
          QueryTTL
        </div>
        {{ transaction.tx.query_ttl.type }}
        <span class="number">
          {{ transaction.tx.query_ttl.value }}
        </span>
      </Field>
      <Field>
        <div class="field-name">
          ResponseTTL
        </div>
        {{ transaction.tx.response_ttl.type }}
        <span class="number">
          {{ transaction.tx.response_ttl.value }}
        </span>
      </Field>
      <Field v-if="transaction.tx.query_fee">
        <div class="field-name">
          QueryFee
        </div>
        <span class="number">
          {{ transaction.tx.query_fee | yaniToAe }}
        </span>
        <span class="unit">
          AE
        </span>
      </Field>
    </div>
    <Field>
      <div class="field-name">
        Query
      </div>
      <pre class="query">{{ transaction.tx.query }}</pre>
    </Field>
  </div>
</template>
<script>
import Field from '../field'

export default {
  name: 'OracleQueryTx',
  components: { Field },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
