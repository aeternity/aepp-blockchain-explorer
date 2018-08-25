<template>
  <div>
    <field v-if='transaction.tx.commitment' name="Commitment">
      <ae-hash type='short' :hash="transaction.tx.commitment" />
      <view-and-copy :text='transaction.tx.commitment'/>
    </field>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'name-preclaim-tx',
  components: { Field, AeHash, ViewAndCopy },
  props: ['transaction']
}
</script>
