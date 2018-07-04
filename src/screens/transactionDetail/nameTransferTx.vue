<template>
  <div>
    <field v-if='transaction.tx.nameHash' name="Name Hash">
      <ae-hash type='short' :hash="transaction.tx.nameHash" />
      <view-and-copy :text='transaction.tx.nameHash'/>
    </field>
    <field v-if='transaction.tx.recipientPubkey' name="recipientPubkey">
      <router-link :to='`/account/${transaction.tx.recipientPubkey}`'>
        <named-address size='short' :address='transaction.tx.recipientPubkey'/>
      </router-link>
      <view-and-copy :text='transaction.tx.recipientPubkey'/>
    </field>
  </div>
</template>
<script>
export default {
  name: 'name-transfer-tx',
  props: ['transaction']
}
</script>
