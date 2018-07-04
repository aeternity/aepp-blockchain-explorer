<template>
  <div>
    <div class="grid">
      <field name='Account'>
        <router-link :to='"/account/" + transaction.tx.account'>
          <named-address :address='transaction.tx.account'/>
        </router-link>
      </field>
      <field name='Name Hash'>
        <ae-hash type="short" :hash='transaction.tx.name_hash'/>
      </field>
      <field name="Name TTL">
        {{transaction.tx.name_ttl}}
      </field>
      <field name="TTL">
        {{transaction.tx.ttl}}
      </field>
    </div>
  </div>
</template>
<script>
export default {
  name: 'name-update-tx',
  props: [
    'transaction'
  ]
}
</script>
