<template>
  <div>
    <div class="grid">
      <Field>
        <AeBadge>{{ transaction.tx.type | txTypeToName }}</AeBadge>
      </Field>
      <Field
        v-if="transaction.hash"
        name="tx hash"
      >
        <RouterLink :to="&quot;/tx/&quot; + transaction.hash">
          <AeHash
            :hash="transaction.hash"
            type="short"
          />
        </RouterLink>
      </Field>
      <Field name="contract">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.contract">
          <NamedAddress :address="transaction.tx.contract" />
        </RouterLink>
      </Field>
      <Field name="caller">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.caller">
          <NamedAddress :address="transaction.tx.caller" />
        </RouterLink>
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
import txTypeToName from '../../filters/txTypeToName'
import Field from '../field'
import NamedAddress from '../namedAddress'
import AeHash from '../aeHash.vue'
import { AeBadge } from '@aeternity/aepp-components'

export default {
  name: 'ContractCallTx',
  components: {
    Field,
    NamedAddress,
    AeHash,
    AeBadge
  },
  filters: { txTypeToName },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
