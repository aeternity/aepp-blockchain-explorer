<template>
  <div>
    <div class="grid">
      <field name="Account">
        <router-link :to="&quot;/account/&quot; + transaction.tx.account">
          <named-address :address="transaction.tx.account"/>
        </router-link>
      </field>
      <field name="Name Hash">
        <ae-hash
          :hash="transaction.tx.name_hash"
          type="short"/>
      </field>
      <field name="Name TTL">
        {{ transaction.tx.name_ttl }}
      </field>
      <field name="TTL">
        {{ transaction.tx.ttl }}
      </field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'
import AeHash from '../aeHash'

export default {
  name: 'NameUpdateTx',
  components: { Field, NamedAddress, AeHash },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
