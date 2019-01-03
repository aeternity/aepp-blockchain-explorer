<template>
  <div>
    <Field
      v-if="transaction.tx.ownerId"
      name="Owner"
    >
      <RouterLink :to="`/account/${ transaction.tx.ownerId }`">
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
    <Field
      v-if="transaction.tx.initiatorId"
      name="Initiator Id"
    >
      <RouterLink :to="`/account/${ transaction.tx.initiatorId}`">
        <NamedAddress
          :address="transaction.tx.initiatorId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy
        v-if="transaction"
        :text="transaction.tx.initiatorId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field
      v-if="transaction.tx.fromId"
      name="Account"
    >
      <RouterLink :to="`/account/${ transaction.tx.fromId }`">
        <NamedAddress
          :address="transaction.tx.fromId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy
        v-if="transaction"
        :text="transaction.tx.fromId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field
      v-if="transaction.tx.toId"
      name="Account"
    >
      <RouterLink :to="`/account/${ transaction.tx.toId }`">
        <NamedAddress
          :address="transaction.tx.toId"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy
        v-if="transaction"
        :text="transaction.tx.toId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field
      v-if="transaction.tx.caller"
      name="Caller"
    >
      <RouterLink :to="`/account/${transaction.tx.caller}`">
        <NamedAddress
          :address="transaction.tx.caller"
          size="short"
        />
      </RouterLink>
    </Field>
    <Field
      v-if="transaction.contractId"
      name="Contract Id"
    >
      <AeHash
        :hash="transaction.contractId"
        type="short"
      />
      <ViewAndCopy :text="transaction.contractId" />
    </Field>
    <Field
      v-if="transaction.tx.responderId"
      name="Responder Id"
    >
      <AeHash
        :hash="transaction.tx.responderId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.responderId" />
    </Field>
    <Field
      v-if="transaction.tx.channelId"
      name="Channel Id"
    >
      <AeHash
        :hash="transaction.tx.channelId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.channelId" />
    </Field>
    <Field
      v-if="transaction.tx.stateHash"
      name="State Hash"
    >
      <AeHash
        :hash="transaction.tx.stateHash"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.stateHash" />
    </Field>
    <Field
      v-if="transaction.tx.gas"
      name="Gas"
    >
      {{ transaction.tx.gas }}
    </Field>
    <Field
      v-if="transaction.tx.gasPrice"
      name="Gas price"
    >
      <div class="number">
        {{ transaction.tx.gasPrice | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field
      v-if="transaction.tx.callData"
      name="Call Data"
    >
      <CodeView :code="transaction.tx.callData " />
    </Field>
    <Field
      v-if="transaction.tx.code"
      name="Contract Code"
    >
      <ContractCode :contract-code="transaction.tx.code" />
    </Field>
    <Field
      v-if="transaction.tx.deposit"
      name="Deposit"
    >
      <span class="number">
        {{ transaction.tx.deposit | yaniToAe }}
      </span>
      <span class="unit">
        AE
      </span>
    </Field>
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
    <Field
      v-if="transaction.tx.name"
      name="Name"
    >
      <div class="number">
        {{ transaction.tx.name }}
      </div>
    </Field>
    <Field
      v-if="transaction.tx.nameSalt"
      name="Name salt"
    >
      <div class="number">
        {{ transaction.tx.nameSalt }}
      </div>
    </Field>

    <Field
      v-if="transaction.tx.commitmentId"
      name="Commitment ID"
    >
      <AeHash
        :hash="transaction.tx.commitmentId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.commitmentId" />
    </Field>
    <Field
      v-if="transaction.tx.nameHash"
      name="Name Hash"
    >
      <AeHash
        :hash="transaction.tx.nameHash"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.nameHash" />
    </Field>
    <Field
      v-if="transaction.tx.recipientPubkey"
      name="recipientPubkey"
    >
      <RouterLink :to="`/account/${transaction.tx.recipientPubkey}`">
        <NamedAddress
          :address="transaction.tx.recipientPubkey"
          size="short"
        />
      </RouterLink>
      <ViewAndCopy :text="transaction.tx.recipientPubkey" />
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
    <Field
      v-if="transaction.tx.channelReserve"
      name="Channel Reserve"
    >
      {{ transaction.tx.channelReserve }}
    </Field>
    <Field
      v-if="transaction.tx.lockPeriod"
      name="Lock Period"
    >
      {{ transaction.tx.lockPeriod }}
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
      v-if="transaction.tx.oracleTtl"
      name="Oracle TTL(Delta)"
    >
      <div class="number">
        {{ transaction.tx.oracleTtl.value }}
      </div>
    </Field>
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
      v-if="transaction.tx.query"
      name="Query"
    >
      {{ transaction.tx.query }}
    </Field>
    <Field
      v-if="transaction.tx.queryFee"
      name="Query Fee"
    >
      <div class="number">
        {{ transaction.tx.queryFee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field
      v-if="transaction.tx.queryTtl"
      name="Query TTL(Delta)"
    >
      <div class="number">
        {{ transaction.tx.queryTtl.value }}
      </div>
    </Field>
    <Field
      v-if="transaction.tx.responseTtl"
      name="Response TTL"
    >
      <div class="number">
        {{ transaction.tx.responseTtl.value }}
      </div>
    </Field>
    <Field
      v-if="transaction.tx.queryFormat"
      name="QueryFormat"
    >
      {{ transaction.tx.queryFormat }}
    </Field>
    <Field
      v-if="transaction.tx.responseFormat"
      name="ResponseFormat"
    >
      {{ transaction.tx.responseFormat }}
    </Field>
    <Field
      v-if="transaction.tx.initiatorAmountFinal"
      name="Initiator Amount Final"
    >
      {{ transaction.tx.initiatorAmountFinal }}
    </Field>
    <Field
      v-if="transaction.tx.responderAmountFinal"
      name="Responder Amount Final"
    >
      {{ transaction.tx.responderAmountFinal }}
    </Field>
    <Field
      v-if="transaction.tx.queryId"
      name="Query"
    >
      <AeHash
        :hash="transaction.tx.queryId"
        type="short"
      />
      <ViewAndCopy :text="transaction.tx.queryId" />
    </Field>
    <Field
      v-if="transaction.tx.response"
      name="Response"
    >
      {{ transaction.tx.response }}
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
        v-if="transaction.tx.recipientId"
        :text="transaction.tx.recipientId"
      />
      <FillDummy
        v-else
        color="grey"
      />
    </Field>
    <Field
      v-if="transaction.tx.poi"
      name="Poi"
    >
      <div class="number poi">
        {{ transaction.tx.poi }}
      </div>
    </Field>
    <Field
      v-if="transaction.tx.payload"
      name="Payload"
    >
      <div class="number">
        {{ transaction.tx.payload }}
      </div>
    </Field>
    <Field
      v-if="transaction.tx.round"
      name="Round"
    >
      <div class="number">
        {{ transaction.tx.round }}
      </div>
    </Field>
    <Field
      v-if="transaction.tx.amount"
      name="Amount"
    >
      <div class="number">
        {{ transaction.tx.amount | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field
      v-if="transaction.tx.fee"
      name="Fee"
    >
      <div class="number">
        {{ transaction.tx.fee | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field
      v-if="transaction.tx.initiatorAmount"
      name="Initiator Amount"
    >
      <div class="number">
        {{ transaction.tx.initiatorAmount | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field
      v-if="transaction.tx.responderAmount"
      name="Responder Amount"
    >
      <div class="number">
        {{ transaction.tx.responderAmount | yaniToAe }}
      </div>
      <span class="unit">
        AE
      </span>
    </Field>
    <Field
      v-if="transaction.tx.vmVersion"
      name="VM Version"
    >
      <div class="number">
        {{ transaction.tx.vmVersion }}
      </div>
    </Field>
    <Field
      v-if="transaction.tx.version"
      name="Version"
    >
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
import CodeView from '../../components/codeView'
import ContractCode from '../../components/contractCode'
import Field from '../../components/field'
import NamedAddress from '../../components/namedAddress'
import ViewAndCopy from '../../components/viewAndCopy'
import FillDummy from '../../components/fillDummy'
import AeHash from '../../components/aeHash'

export default {
  name: 'TypeTx',
  components: {
    CodeView,
    ContractCode,
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
