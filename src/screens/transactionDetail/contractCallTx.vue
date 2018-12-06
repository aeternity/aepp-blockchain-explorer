<template>
  <div>
    <field
      v-if="transaction.tx.caller"
      name="Caller">
      <router-link :to="`/account/${transaction.tx.caller}`">
        <named-address
          :address="transaction.tx.caller"
          size="short"/>
      </router-link>
    </field>
    <field name="Gas">
      {{ transaction.tx.gas }}
    </field>
    <field name="Gas price">
      {{ transaction.tx.gasPrice }}
    </field>
    <field name="Gas Used">
      {{ transaction.tx.gas }}
    </field>
    <field name="VM Version">
      <code-view :code="transaction.tx.vmVersion " />
    </field>
    <field name="Call Data">
      <code-view :code="transaction.tx.callData " />
    </field>
  </div>
</template>
<script>
import CodeView from '../../components/codeView.vue'
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'

export default {
  name: 'ContractCallTx',
  components: {
    CodeView,
    Field,
    NamedAddress
  },
  props: ['transaction']
}
</script>
