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
    <field name="Gas Used">
      {{contractCall.gasUsed}}
    </field>
    <field name="VM Version">
      <code-view :code="transaction.tx.vmVersion | numbersToString" />
    </field>
    <field name="Call Data">
      <code-view :code="transaction.tx.callData | numbersToString" />
    </field>
    <field name="Return Type">
      <code-view :code='contractCall.returnType'/>
    </field>
    <field name="Return Value">
      <code-view :code='contractCall.returnValue'/>
    </field>
    <field name="Caller Nonce">
      {{ contractCall.callerNonce }}
    </field>
  </div>
</template>
<script>
import CodeView from '../../components/codeView.vue'
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'
import numbersToString from '../../filters/numbersToString'

export default {
  name: 'contract-call-tx',
  props: ['transaction'],
  data () {
    return {
      contractCall: null
    }
  },
  components: {
    CodeView,
    Field,
    NamedAddress
  },
  filters: { numbersToString },
  async mounted () {
    this.contractCall = await this.$store.dispatch('transactions/getContractCallFromTx', this.transaction.hash)
  }
}
</script>
