<template>
  <div>
    <field name="account">
      <router-link :to='"/account/" + transaction.tx.accountId'>
        <named-address :address='transaction.tx.accountId'/>
      </router-link>
    </field>
    <field v-if='transaction.tx.commitmentId' name="Commitment">
      <ae-hash type='short' :hash="transaction.tx.commitmentId" />
      <view-and-copy :text='transaction.tx.commitmentId'/>
    </field>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import NamedAddress from '../../components/namedAddress'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'name-preclaim-tx',
  components: { Field, AeHash, NamedAddress, ViewAndCopy },
  props: ['transaction']
}
</script>
