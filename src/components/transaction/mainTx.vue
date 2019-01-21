<template>
  <div>
    <div class="grid">
      <Field>
        <AeBadge>{{ transaction.tx.type | txTypeToName }}</AeBadge>
      </Field>
      <Field
        v-if="transaction.hash"
        name="tx hash"
      >
        <RouterLink :to="&quot;/tx/&quot; + transaction.hash">
          <AeHash
            :hash="transaction.hash"
            type="short"
          />
        </RouterLink>
      </Field>
      <Field
        v-if="transaction.tx.responderId"
        name="Responder Id"
      >
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.responderId">
          <NamedAddress :address="transaction.tx.responderId" />
        </RouterLink>
      </Field>
      <Field
        v-if="transaction.tx.channelId"
        name="Channel Id"
      >
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.channelId">
          <NamedAddress :address="transaction.tx.channelId" />
        </RouterLink>
      </Field>
      <Field
        v-if="transaction.tx.fromId"
        name="From Id"
      >
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.fromId">
          <NamedAddress :address="transaction.tx.fromId" />
        </RouterLink>
      </Field>
      <Field
        v-if="transaction.tx.toId"
        name="To Id"
      >
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.toId">
          <NamedAddress :address="transaction.tx.toId" />
        </RouterLink>
      </Field>
      <Field
        v-if="transaction.tx.initiatorId"
        name="Initiator Id"
      >
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.initiatorId">
          <NamedAddress :address="transaction.tx.initiatorId" />
        </RouterLink>
      </Field>
      <Field
        v-if="transaction.tx.accountId"
        name="account"
      >
        <RouterLink :to="&quot;/account/&quot; + transaction.tx.accountId">
          <NamedAddress :address="transaction.tx.accountId" />
        </RouterLink>
      </Field>
      <Field
        v-if="transaction.tx.oracleId"
        name="Oracle"
      >
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.oracleId">
            <NamedAddress :address="transaction.tx.oracleId" />
          </RouterLink>
        </div>
      </Field>
      <Field
        v-if="transaction.tx.senderId"
        name="sender"
      >
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.senderId">
            <NamedAddress :address="transaction.tx.senderId" />
          </RouterLink>
        </div>
      </Field>
      <Field
        v-if="transaction.tx.ownerId"
        name="Owner"
      >
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.ownerId">
            <NamedAddress :address="transaction.tx.ownerId" />
          </RouterLink>
        </div>
      </Field>
      <Field
        v-if="transaction.tx.recipientId"
        name="recipient"
      >
        <div class="account-address">
          <RouterLink :to="&quot;/account/&quot; + transaction.tx.recipientId">
            <NamedAddress :address="transaction.tx.recipientId" />
          </RouterLink>
        </div>
      </Field>
      <Field
        v-if="transaction.tx.name"
        name="name"
      >
        {{ transaction.tx.name }}
      </Field>
      <Field
        v-if="transaction.tx.amount"
        name="amount"
      >
        <span class="number">
          {{ transaction.tx.amount | yaniToAe }}
        </span>
        <span class="unit">
          AE
        </span>
      </Field>
    </div>
  </div>
</template>
<script>
import txTypeToName from '../../filters/txTypeToName'
import Field from '../field'
import NamedAddress from '../namedAddress'
import AeHash from '../aeHash.vue'
import { AeBadge } from '@aeternity/aepp-components'

export default {
  name: 'MainTx',
  components: {
    Field,
    NamedAddress,
    AeHash,
    AeBadge
  },
  filters: { txTypeToName },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
