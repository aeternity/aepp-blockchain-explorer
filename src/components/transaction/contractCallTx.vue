<template>
  <div>
    <div class="grid">
      <Field name="contract">
        <router-link :to="&quot;/account/&quot; + transaction.tx.contract">
          <NamedAddress :address="transaction.tx.contract" />
        </router-link>
      </Field>
      <Field name="caller">
        <router-link :to="&quot;/account/&quot; + transaction.tx.caller">
          <NamedAddress :address="transaction.tx.caller" />
        </router-link>
      </Field>
      <Field name="amount">
        <span class="number">
          {{ transaction.tx.amount | yaniToAe }}
        </span>
        <span class="unit">
          AE
        </span>
      </Field>
      <Field name="gas">
        {{ transaction.tx.gas }}
      </Field>
      <Field name="gasPrice">
        {{ transaction.tx.gasPrice }}
      </Field>
      <Field name="ttl">
        {{ transaction.tx.ttl }}
      </Field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'

export default {
  name: 'ContractCallTx',
  components: { Field, NamedAddress },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
