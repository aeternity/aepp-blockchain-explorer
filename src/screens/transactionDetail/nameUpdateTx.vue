<template>
  <div>

    <field
      v-if="transaction.tx.nameHash"
      name="Name Hash">
      <ae-hash
        :hash="transaction.tx.nameHash"
        type="short"/>
      <view-and-copy :text="transaction.tx.nameHash" />
    </field>

    <field
      v-if="transaction.tx.nameTtl"
      name="Name TTL">
      {{ transaction.tx.nameTtl }}
    </field>

    <div v-if="transaction.tx.pointers">
      <h2>Pointers</h2>
      <field
        v-for="(pointer, key) in transaction.tx.pointers"
        :name="`${key}`"
        :key="key">
        <ae-hash
          :hash="pointer"
          type="short" />
        <view-and-copy :text="pointer"/>
      </field>
    </div>

  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'

export default {
  name: 'NameUpdateTx',
  components: { Field, AeHash, ViewAndCopy },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
