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
      <Field name="Owner">
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.ownerId">
            <NamedAddress :address="transaction.tx.ownerId" />
          </RouterLink>
        </div>
      </Field>
      <Field name="amount">
        <span class="number">
          {{ transaction.tx.amount | yaniToAe }}
        </span>
        <span class="unit">
          AE
        </span>
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
  name: 'ContractCreateTx',
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
