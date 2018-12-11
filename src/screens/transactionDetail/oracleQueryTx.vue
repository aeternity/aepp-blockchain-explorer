<template>
  <div>
    <Field
      v-if="transaction.tx.senderId"
      name="Sender"
    >
      <RouterLink :to="&quot;/account/&quot; + transaction.tx.senderId">
        <NamedAddress :address="transaction.tx.senderId" />
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
      v-if="transaction.tx.oracleId"
      name="Oracle"
    >
      <AeHash
        :hash="transaction.tx.oracleId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.oracleId" />
    </Field>

    <Field
      v-if="transaction.tx.query"
      name="Query"
    >
      {{ transaction.tx.query }}
    </Field>
    <Field
      v-if="transaction.tx.commitmentId"
      name="Commitment"
    >
      <AeHash
        :hash="transaction.tx.commitmentId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.commitmentId" />
    </Field>
    <Field name="Fee">
      <div class="number">
        {{ transaction.tx.fee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field name="Query Fee">
      <div class="number">
        {{ transaction.tx.queryFee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field name="Query TTL(Delta) ">
      <div class="number">
        {{ transaction.tx.queryTtl.value }}
      </div>
    </Field>
    <Field name="Type ">
      <div class="number">
        {{ transaction.tx.type }}
      </div>
    </Field>
    <Field name="Response TTL">
      <div class="number">
        {{ transaction.tx.responseTtl.value }}
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
import Field from '../../components/field'
import NamedAddress from '../../components/namedAddress.vue'
import ViewAndCopy from '../../components/viewAndCopy'
import FillDummy from '../../components/fillDummy'
import AeHash from '../../components/aeHash'
export default {
  name: 'OracleQueryTx',
  components: {
    Field,
    NamedAddress,
    ViewAndCopy,
    FillDummy,
    AeHash
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
