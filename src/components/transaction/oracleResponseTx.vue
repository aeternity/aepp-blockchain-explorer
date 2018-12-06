<template>
  <div>
    <div class="grid">
      <field>
        <span class="field-name">Oracle</span>
        <div class="account-address">
          <router-link :to="&quot;/account/&quot; + transaction.tx.account">
            <named-address :address="transaction.tx.account"/>
          </router-link>
        </div>
      </field>
      <field>
        <span class="field-name">QueryId</span>
        <div class="">
          {{ transaction.tx.query_id }}
        </div>
      </field>
    </div>
    <field>
      <span class="field-name">Response</span>
      <pre
        v-if="responsePrettyJson "
        class="response">{{ responsePrettyJson }}</pre>
      <pre
        v-else
        class="response">{{ transaction.tx.response }}</pre>
    </field>
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
