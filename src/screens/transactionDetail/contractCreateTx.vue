<template>
  <div>
      <field v-if='transaction.tx.owner' name="Account">
        <router-link :to='`/account/${transaction.tx.owner}`'>
          <named-address size='short' :address='transaction.tx.owner'/>
        </router-link>
      </field>
      <field name="TTL">
        <div class="number">{{transaction.tx.ttl}}</div>
      </field>
      <field name="Deposit">
        <span class='number'>{{transaction.tx.deposit}}</span>
        <span class="unit">AE</span>
      </field>
      <field name="Gas">
        {{transaction.tx.gas}}
      </field>
      <field name="Gas price">
        {{transaction.tx.gasPrice}}
      </field>

      <field name="Contract Code">
        <contract-code :contract-code='transaction.tx.code'/>
      </field>
      <field name="Call Data">
        <call-data :call-data='transaction.tx.callData'/>
      </field>
  </div>
</template>
<script>
import ContractCode from '../../components/contractCode/contractCode.vue'
import CallData from '../../components/callData/callData.vue'
import Field from '../../components/field/field.vue'
import NamedAddress from '../../components/namedAddress/namedAddress.vue'
export default {
  name: 'contract-create-tx',
  props: ['transaction'],
  components: {
    CallData,
    ContractCode,
    Field,
    NamedAddress
  }
}
</script>
