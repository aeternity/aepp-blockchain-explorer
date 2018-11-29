<template>
  <div>
    <div class="grid">
      <field v-if='transaction.tx.owner' name="Account">
        <router-link :to='`/account/${transaction.tx.owner}`'>
          <named-address size='short' :address='transaction.tx.owner'/>
        </router-link>
      </field>
      <field name="TTL">
        <div class="number">{{transaction.tx.ttl}}</div>
      </field>
      <field name="Deposit">
        <span class='number'>{{yaniToAe(transaction.tx.deposit)}}</span>
        <span class="unit">AE</span>
      </field>
      <field name="Gas">
        {{transaction.tx.gas}}
      </field>
      <field name="Gas price">
        {{transaction.tx.gasPrice}}
      </field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'

export default {
  name: 'contract-create-tx',
  components: { Field, NamedAddress },
  props: [
    'transaction'
  ]
}
</script>
