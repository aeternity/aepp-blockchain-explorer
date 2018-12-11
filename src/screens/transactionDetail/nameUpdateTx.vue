<template>
  <div>
    <Field
      v-if="transaction.tx.accountId"
      name="Account"
    >
      <RouterLink :to="&quot;/account/&quot; + transaction.tx.accountId">
        <NamedAddress :address="transaction.tx.accountId" />
      </RouterLink>
      <ViewAndCopy
        v-if="transaction"
        :text="transaction.tx.accountId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field
      v-if="transaction.tx.nameId"
      name="Name id"
    >
      <AeHash
        :hash="transaction.tx.nameId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.nameId" />
    </Field>

    <Field
      v-if="transaction.tx.nameTtl"
      name="NameTTL"
    >
      {{ transaction.tx.nameTtl }}
    </Field>
    <Field
      v-if="transaction.tx.nameTtl"
      name="Client TTL"
    >
      {{ transaction.tx.clientTtl }}
    </Field>
    <Field name="Fee">
      <div class="number">
        {{ transaction.tx.fee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field name="Version">
      <div class="number">
        {{ transaction.tx.version }}
      </div>
    </Field>

    <div v-if="transaction.tx.pointers">
      <h2>Pointers</h2>
      <Field
        v-for="(pointer, key) in transaction.tx.pointers"
        :key="key"
        :name="pointer.key"
      >
        <AeHash
          :hash="pointer.id"
          type="short"
        />
        <ViewAndCopy :text="pointer.id" />
      </Field>
    </div>
  </div>
</template>
<script>
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy'
import NamedAddress from '../../components/namedAddress.vue'
import FillDummy from '../../components/fillDummy'

export default {
  name: 'NameUpdateTx',
  components: {
    Field,
    AeHash,
    ViewAndCopy,
    NamedAddress,
    FillDummy
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
