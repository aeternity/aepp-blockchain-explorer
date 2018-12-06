<template>
  <div>
    <div class="grid">
      <field>
        <div class="field-name">Oracle</div>
        <div class="account-address">
          <router-link :to="&quot;/account/&quot; + transaction.tx.oracle">
            {{ transaction.tx.oracle | startAndEnd }}
          </router-link>
        </div>
      </field>
      <field>
        <div class="field-name">sender</div>
        <div class="account-address">
          <router-link :to="&quot;/account/&quot; + transaction.tx.sender">
            {{ transaction.tx.sender | startAndEnd }}
          </router-link>
        </div>
      </field>
    </div>
    <div class="grid">
      <field>
        <div class="field-name">QueryTTL</div>
        {{ transaction.tx.query_ttl.type }}
        <span class="number">
          {{ transaction.tx.query_ttl.value }}
        </span>
      </field>
      <field>
        <div class="field-name">ResponseTTL</div>
        {{ transaction.tx.response_ttl.type }}
        <span class="number">
          {{ transaction.tx.response_ttl.value }}
        </span>
      </field>
      <field v-if="transaction.tx.query_fee">
        <div class="field-name">QueryFee</div>
        <span class="number">{{ transaction.tx.query_fee | yaniToAe }}</span>
        <span class="unit">AE</span>
      </field>
    </div>
    <field>
      <div class="field-name">Query</div>
      <pre class="query">{{ transaction.tx.query }}</pre>
    </field>
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
