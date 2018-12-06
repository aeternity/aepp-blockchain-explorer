<template>
  <div>
    <field
      v-if="transaction.tx.commitment"
      name="Commitment">
      <ae-hash
        :hash="transaction.tx.commitment"
        type="short" />
      <view-and-copy :text="transaction.tx.commitment"/>
    </field>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'NamePreclaimTx',
  components: { Field, AeHash, ViewAndCopy },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
