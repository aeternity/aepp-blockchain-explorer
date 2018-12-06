<template>
  <div>
    <field
      v-if="transaction.tx.ownerId"
      name="Account">
      <router-link :to="`/account/${transaction.tx.ownerId}`">
        <named-address
          :address="transaction.tx.ownerId"
          size="short"/>
      </router-link>
    </field>
    <field name="TTL">
      <div class="number">{{ transaction.tx.ttl }}</div>
    </field>
    <field name="Deposit">
      <span class="number">{{ transaction.tx.deposit | yaniToAe }}</span>
      <span class="unit">AE</span>
    </field>
    <field name="Gas">
      {{ transaction.tx.gas }}
    </field>
    <field name="Gas price">
      {{ transaction.tx.gasPrice }}
    </field>

    <field name="Contract Code">
      <contract-code :contract-code="transaction.tx.code"/>
    </field>
    <field name="Call Data">
      <code-view :code="transaction.tx.callData " />
    </field>
  </div>
</template>
<script>
import ContractCode from '../../components/contractCode.vue'
import CodeView from '../../components/codeView.vue'
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'

export default {
  name: 'ContractCreateTx',
  components: {
    CodeView,
    ContractCode,
    Field,
    NamedAddress
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
