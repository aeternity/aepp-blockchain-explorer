<template>
  <div>
    <field v-if='transaction.tx.commitment' name="Commitment">
      <ae-hash type='short' :hash="transaction.tx.commitment" />
      <view-and-copy :text='transaction.tx.commitment'/>
    </field>
  </div>
</template>
<script>
export default {
  name: 'name-preclaim-tx',
  props: ['transaction']
}
</script>
