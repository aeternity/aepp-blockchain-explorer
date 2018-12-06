<template>
  <div>
    <div class="grid">
      <Field>
        <span class="field-name">
          Oracle
        </span>
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.account">
            <NamedAddress :address="transaction.tx.account" />
          </RouterLink>
        </div>
      </Field>
      <Field>
        <span class="field-name">
          QueryId
        </span>
        <div class="">
          {{ transaction.tx.query_id }}
        </div>
      </Field>
    </div>
    <Field>
      <span class="field-name">
        Response
      </span>
      <pre
        v-if="responsePrettyJson "
        class="response"
      >{{ responsePrettyJson }}</pre>
      <pre
        v-else
        class="response"
      >{{ transaction.tx.response }}</pre>
    </Field>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'

export default {
  name: 'OracleResponseTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
