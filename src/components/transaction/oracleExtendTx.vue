<template>
  <div>
    <div class="grid">
      <Field>
        <span class="field-name">
          Oracle
        </span>
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.oracleId">
            <NamedAddress :address="transaction.tx.oracleId" />
          </RouterLink>
        </div>
      </Field>
      <Field>
        <div class="field-name">
          OracleTTL
        </div>
        {{ transaction.tx.oracleTtl.type }}
        <span class="number">
          {{ transaction.tx.oracleTtl.value }}
        </span>
      </Field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'

export default {
  name: 'OracleExtendTx',
  components: {
    Field,
    NamedAddress
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  mounted () {
    console.log(this.transaction)
  }
}
</script>
