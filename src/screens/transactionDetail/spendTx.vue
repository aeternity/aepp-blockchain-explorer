<template>
  <div>

    <field v-if='transaction.tx.senderId' name="Sender">
      <router-link :to='`/account/${transaction.tx.senderId}`'>
        <named-address size='short' :address='transaction.tx.senderId'/>
      </router-link>
      <view-and-copy :text='transaction.tx.senderId'/>
    </field>

    <field v-if='transaction.tx.recipientId' name="Recipient">
      <router-link :to='`/account/${transaction.tx.recipientId}`'>
        <named-address size='short' :address='transaction.tx.recipientId'/>
      </router-link>
      <view-and-copy :text='transaction.tx.recipientId'/>
    </field>

    <field v-if='transaction.tx.amount' name="Amount">
      {{yaniToAe(transaction.tx.amount)}} AE
    </field>

  </div>
</template>
<script>
import Field from '../../components/field'
import NamedAddress from '../../components/namedAddress'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'spend-tx',
  components: { Field, NamedAddress, ViewAndCopy },
  props: ['transaction']
}
</script>
