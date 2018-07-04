<template>
  <div>
    <field v-if='transaction.tx.caller' name="Caller">
      <router-link :to='`/account/${transaction.tx.caller}`'>
        <named-address size='short' :address='transaction.tx.caller'/>
      </router-link>
    </field>
    <field name="Gas">
      {{transaction.tx.gas}}
    </field>
    <field name="Gas price">
      {{transaction.tx.gasPrice}}
    </field>
    <field name="VM Version">
    <call-data :call-data='transaction.tx.vmVersion'/>
    </field>
    <field name="Call Data">
      <call-data :call-data='transaction.tx.callData'/>
    </field>
  </div>
</template>
<script>
import CallData from '../../components/callData/callData.vue'
export default {
  name: 'contract-call-tx',
  props: ['transaction'],
  components: {
    CallData
  }
}
</script>
