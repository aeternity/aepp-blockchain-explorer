<template>
  <div>
    <div class="grid">
      <field name="account">
        <router-link :to='"/account/" + transaction.tx.account'>
          <named-address :address='transaction.tx.account'/>
        </router-link>
      </field>
      <field name="commitment">
        <ae-hash type='short' :hash="transaction.tx.commitment" />
      </field>
      <field name="fee">
        {{transaction.tx.fee}}
      </field>
    </div>
  </div>
</template>
<script>
export default {
  name: 'name-preclaim-tx',
  props: [
    'transaction'
  ]
}
</script>
