<template>
  <div class="transaction">
    <div class="transaction-main-info">
      <div class="transaction-main-info-inner">
        <div class="transaction-label">
          <LabelType
            :title="transaction.type.replace(/([A-Z])/g, ' $1')"
            fill="red"
          />
        </div>
        <AppDefinition
          v-if="transaction.time"
          title="Age"
        >
          <Age :time="transaction.time" />
        </AppDefinition>
      </div>
      <div class="transaction-main-info-inner accounts">
        <AccountGroup>
          <Account
            v-if="transaction.sender_id"
            :value="transaction.sender_id"
            title="Sender"
            icon
          />
          <Account
            v-if="transaction.recipient_id"
            :value="transaction.recipient_id"
            title="recipient"
            icon
          />
        </AccountGroup>
      </div>
    </div>
    <div class="transaction-type-info">
      <div class="transaction-type-info-item ">
        <AppDefinition
          v-if="transaction.amount"
          title="Amount"
        >
          <FormatAeUnit
            :value="transaction.amount "
          />
        </AppDefinition>
      </div>
      <div class="transaction-type-info-item ">
        <AppDefinition
          v-if="transaction.fee"
          title="Tx fee"
        >
          <FormatAeUnit
            :value="transaction.fee"
          />
        </AppDefinition>
      </div>
    </div>
  </div>
</template>
<script>
import AppDefinition from '~/components/appDefinition'
import FormatAeUnit from '~/components/formatAeUnit'
import AccountGroup from '~/components/accountGroup'
import Account from '~/components/account'
import Age from '~/components/age'
import LabelType from '~/components/labelType'

export default {
  name: 'SpendTx',
  components: {
    LabelType,
    AppDefinition,
    FormatAeUnit,
    AccountGroup,
    Account,
    Age
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
