<template>
  <div>
    <Field
      v-if="transaction.tx.senderId"
      name="Sender"
    >
      <RouterLink :to="`/account/${transaction.tx.senderId}`">
        <NamedAddress
          :address="transaction.tx.senderId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy
        v-if="transaction"
        :text="transaction.tx.senderId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field
      v-if="transaction.tx.recipientId"
      name="Recipient"
    >
      <RouterLink :to="`/account/${transaction.tx.recipientId}`">
        <NamedAddress
          :address="transaction.tx.recipientId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy
        v-if="transaction"
        :text="transaction.tx.recipientId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field name="Payload">
      <div class="number">
        {{ transaction.tx.payload }}
      </div>
    </Field>
    <Field name="Amount">
      <div class="number">
        {{ transaction.tx.amount | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
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
  </div>
</template>
<script>
import Field from '../../components/field'
import NamedAddress from '../../components/namedAddress'
import ViewAndCopy from '../../components/viewAndCopy'
import FillDummy from '../../components/fillDummy'

export default {
  name: 'SpendTx',
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
