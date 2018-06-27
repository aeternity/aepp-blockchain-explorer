<template>
  <div>
    <div class="grid">
      <field name="sender">
      <div class="account-address">
        <router-link :to='"/account/" + transaction.tx.sender'>
          <named-address :address='transaction.tx.sender'/>
        </router-link>
      </div>
      </field>
      <field name='recipient'>
      <div class="account-address">
        <router-link :to='"/account/" + transaction.tx.recipient'>
          <named-address :address='transaction.tx.recipient'/>
        </router-link>
      </div>
      </field>
      <field name='amount'>
      <span class='number'>{{ transaction.tx.amount }}</span>
      <span class="unit">AE</span>
      </field>
    </div>
  </div>
</template>
<script>
export default {
  name: 'spend-tx',
  props: [
    'transaction'
  ]
}
</script>
