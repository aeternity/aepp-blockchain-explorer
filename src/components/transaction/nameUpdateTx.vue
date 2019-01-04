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
      <Field name="Account">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.accountId">
          <NamedAddress :address="transaction.tx.accountId" />
        </RouterLink>
      </Field>
      <Field name="Name">
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.nameId">
          <NamedAddress :address="transaction.tx.nameId" />
        </RouterLink>
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
  name: 'NameUpdateTx',
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
