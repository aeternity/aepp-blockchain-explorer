<template>
  <div>
    <div class="grid">
      <field name="contract">
        <router-link :to='"/account/" + transaction.tx.contract'>
          <named-address :address='transaction.tx.contract'/>
        </router-link>
      </field>
      <field name="caller">
        <router-link :to='"/account/" + transaction.tx.caller'>
          <named-address :address='transaction.tx.caller'/>
        </router-link>
      </field>
      <field name='amount'>
        <span class='number'>{{ transaction.tx.amount }}</span>
        <span class="unit">AE</span>
      </field>
      <field name="gas">
        {{transaction.tx.gas}}
      </field>
      <field name="gasPrice">
        {{transaction.tx.gasPrice}}
      </field>
      <field name="ttl">
        {{transaction.tx.ttl}}
      </field>
    </div>
  </div>
</template>
<script>
import Field from '../field/field'
import NamedAddress from '../namedAddress/namedAddress'

export default {
  name: 'contract-call-tx',
  components: { Field, NamedAddress },
  props: [
    'transaction'
  ]
}
</script>
