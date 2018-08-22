<template>
  <div>

    <field v-if='transaction.tx.sender' name="Sender">
      <router-link :to='`/account/${transaction.tx.sender}`'>
        <named-address size='short' :address='transaction.tx.sender'/>
      </router-link>
      <view-and-copy :text='transaction.tx.sender'/>
    </field>

    <field v-if='transaction.tx.recipient' name="Recipient">
      <router-link :to='`/account/${transaction.tx.recipient}`'>
        <named-address size='short' :address='transaction.tx.recipient'/>
      </router-link>
      <view-and-copy :text='transaction.tx.recipient'/>
    </field>

    <field v-if='transaction.tx.amount' name="Amount">
      {{transaction.tx.amount}} AE
    </field>

  </div>
</template>
<script>
export default {
  name: 'spend-tx',
  props: ['transaction']
}
</script>
