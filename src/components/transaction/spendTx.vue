<template>
  <div>
    <div class="grid">
      <field name="sender">
      <div class="account-address">
        <router-link :to='"/account/" + transaction.tx.senderId'>
          <named-address :address='transaction.tx.senderId'/>
        </router-link>
      </div>
      </field>
      <field name='recipient'>
      <div class="account-address">
        <router-link :to='"/account/" + transaction.tx.recipientId'>
          <named-address :address='transaction.tx.recipientId'/>
        </router-link>
      </div>
      </field>
      <field name='amount'>
      <span class='number'>{{transaction.tx.amount | yaniToAe}}</span>
      <span class="unit">AE</span>
      </field>
    </div>
  </div>
</template>
<script>
import Field from '../field'
import NamedAddress from '../namedAddress'

export default {
  name: 'spend-tx',
  components: { Field, NamedAddress },
  props: [
    'transaction'
  ]
}
</script>
