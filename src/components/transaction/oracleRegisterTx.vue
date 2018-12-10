<template>
  <div>
    <div class="grid">
      <Field name="">
        <span class="field-name">
          account
        </span>
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.account">
            <NamedAddress :address="transaction.tx.account" />
          </RouterLink>
        </div>
      </Field>
      <Field name="">
        <div class="field-name">
          TTL
        </div>
        {{ transaction.tx.ttl.type }}
        <span class="number">
          {{ transaction.tx.ttl.value }}
        </span>
      </Field>
      <Field
        v-if="transaction.tx.query_fee"
        name=""
      >
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
        QuerySpec
      </div>
      <pre class="query-spec">{{ transaction.tx.query_spec }}</pre>
    </Field>
    <Field>
      <div class="field-name">
        ResponseSpec
      </div>
      <pre class="response-spec">{{ transaction.tx.response_spec }}</pre>
    </Field>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'

export default {
  name: 'OracleRegisterTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
