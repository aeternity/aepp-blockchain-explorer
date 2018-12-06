<template>
  <div>
    <div class="grid">
      <field name="account">
        <router-link :to="&quot;/account/&quot; + transaction.tx.account">
          <named-address :address="transaction.tx.account"/>
        </router-link>
      </field>
      <field name="commitment">
        <ae-hash
          :hash="transaction.tx.commitment"
          type="short" />
      </field>
      <field name="fee">
        {{ transaction.tx.fee }}
      </field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'
import AeHash from '../aeHash'

export default {
  name: 'NamePreclaimTx',
  components: { Field, NamedAddress, AeHash },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
