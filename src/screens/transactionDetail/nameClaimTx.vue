<template>
  <div>
    <field
      v-if="transaction.tx.name"
      name="Name">
      {{ transaction.tx.name }}
    </field>
    <field
      v-if="transaction.tx.nameSalt"
      name="Name Salt">
      {{ transaction.tx.nameSalt }}
    </field>
  </div>
</template>
<script>
import Field from '../../components/field.vue'

export default {
  name: 'NameClaimTx',
  components: { Field },
  props: ['transaction']
}
</script>
