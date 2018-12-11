<template>
  <div>
    <Field
      v-if="transaction.tx.ownerId"
      name="Owner"
    >
      <RouterLink :to="`/account/${transaction.tx.ownerId}`">
        <NamedAddress
          :address="transaction.tx.ownerId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy
        v-if="transaction"
        :text="transaction.tx.ownerId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field name="VmVersion">
      <div class="number">
        {{ transaction.tx.vmVersion }}
      </div>
    </Field>
    <Field name="Amount">
      <div class="number">
        {{ transaction.tx.amount }}
      </div>
    </Field>
    <Field name="Fee">
      <div class="number">
        {{ transaction.tx.fee }}
      </div>
    </Field>
    <Field name="Version">
      <div class="number">
        {{ transaction.tx.version }}
      </div>
    </Field>
  </div>
</template>
<script>
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'
import ViewAndCopy from '../../components/viewAndCopy.vue'
import FillDummy from '../../components/fillDummy'

export default {
  name: 'ContractCreateTx',
  components: {
    Field,
    NamedAddress,
    ViewAndCopy,
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
