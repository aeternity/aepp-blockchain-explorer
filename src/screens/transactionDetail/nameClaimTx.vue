<template>
  <div>
    <Field
      v-if="transaction.tx.accountId"
      name="Account"
    >
      <RouterLink :to="`/account/${transaction.tx.accountId}`">
        <NamedAddress
          :address="transaction.tx.accountId"
          size="short"
        />
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
    <Field name="Fee">
      <div class="number">
        {{ transaction.tx.fee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field name="Name">
      <div class="number">
        {{ transaction.tx.name }}
      </div>
    </Field>
    <Field name="Name salt">
      <div class="number">
        {{ transaction.tx.nameSalt }}
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
  name: 'NameClaimTx',
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
