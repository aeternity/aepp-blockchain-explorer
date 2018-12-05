<template>
  <div>
    <div class="grid">
      <field name="account">
        <router-link :to='"/account/" + transaction.tx.accountId'>
          <named-address :address='transaction.tx.accountId'/>
        </router-link>
      </field>
      <field name="commitment">
        <ae-hash type='short' :hash="transaction.tx.commitmentId" />
      </field>
      <field name="fee">
        {{transaction.tx.fee}}
      </field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'
import AeHash from '../aeHash'

export default {
  name: 'name-preclaim-tx',
  components: { Field, NamedAddress, AeHash },
  props: [
    'transaction'
  ]
}
</script>
