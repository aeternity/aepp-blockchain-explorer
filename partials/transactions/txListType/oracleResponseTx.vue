<template>
  <div class="transaction">
    <div class="transaction-main-info">
      <div class="transaction-main-info-inner">
        <div class="transaction-label">
          <LabelType
            :title="data.type.replace(/([A-Z])/g, ' $1')"
            fill="red"
          />
        </div>
        <AppDefinition
          v-if="data.time"
          title="Age"
        >
          <Age :time="data.time" />
        </AppDefinition>
      </div>
      <div class="transaction-main-info-inner accounts">
        <AccountGroup>
          <Account
            v-if="data.account_id"
            :value="data.account_id"
            title="account"
            icon
          />
          <Account
            v-if="data.sender_id"
            :value="data.sender_id"
            title="Sender"
            icon
          />
          <Account
            v-if="data.recipient_id"
            :value="data.recipient_id"
            title="recipient"
            icon
          />
        </AccountGroup>
      </div>
    </div>
    <div class="transaction-type-info">
      <div class="transaction-type-info-item " />
      <div class="transaction-type-info-item ">
        <AppDefinition
          v-if="data.fee"
          title="tx fee"
        >
          <FormatAeUnit
            :value="data.fee"
          />
        </AppDefinition>
        <AppDefinition
          v-if="data.cost"
          title="tx cost"
        >
          <FormatAeUnit
            :value="data.cost"
          />
        </AppDefinition>
      </div>
    </div>
  </div>
</template>
<script>
import AppDefinition from '../../../components/appDefinition'
import FormatAeUnit from '../../../components/formatAeUnit'
import AccountGroup from '../../../components/accountGroup'
import Account from '../../../components/account'
import Age from '../../../components/age'
import LabelType from '../../../components/labelType'

export default {
  name: 'OracleResponseTx',
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
