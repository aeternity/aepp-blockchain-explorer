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
        <AppDefinition
          v-if="data.name"
          title="name"
          class="name"
        >
          {{ data.name }}
        </AppDefinition>
      </div>
    </div>
    <div class="transaction-type-info">
      <div class="transaction-type-info-item ">
        <AppDefinition
          v-if="data.amount"
          title="Amount"
        >
          <FormatAeUnit
            :value="data.amount"
            type="ae"
          />
        </AppDefinition>
        <AppDefinition
          v-if="data.deposit"
          title="Deposit"
        >
          <FormatAeUnit
            :value="data.deposit"
            type="ae"
          />
        </AppDefinition>
      </div>
      <div class="transaction-type-info-item ">
        <AppDefinition
          v-if="data.fee"
          title="Amount"
        >
          <FormatAeUnit
            :value="data.fee"
            type="fee"
          />
        </AppDefinition>
        <AppDefinition
          v-if="data.cost"
          title="tx cost"
        >
          <FormatAeUnit
            :value="data.cost"
            type="fee"
          />
        </AppDefinition>
      </div>
    </div>
  </div>
</template>

<script>

import AppDefinition from '@/_designs/components/appDefinition'
import FormatAeUnit from '@/_designs/components/formatAeUnit'
import AccountGroup from '@/_designs/components/accountGroup'
import Account from '@/_designs/components/account'
import Age from '@/_designs/components/age'
import LabelType from '@/_designs/components/labelType'

export default {
  name: 'TXListItem',
  components: {
    LabelType,
    AppDefinition,
    FormatAeUnit,
    AccountGroup,
    Account,
    Age
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../../node_modules/@aeternity/aepp-components-3/src/styles/variables/colors";
  .transaction {
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    padding: .6rem .6rem 0 0;
    border-radius: .4rem;
    box-shadow: 0 0 16px 0 rgba(27,68,121,0.10);
    margin-bottom: 1rem;
    width: 100%;
    @media (min-width: 550px) {
      flex-direction: row;
      border-radius: 0;
      box-shadow: none;
      margin-bottom: 0;
      &:not(:last-child) {
        border-bottom: 2px solid $color-neutral-positive-2;
      }
    }

    .transaction-main-info {
      display: flex;
      margin-bottom: .6rem;
      flex-direction: row;
      width: 100%;
      @media (min-width: 550px) {
        width: 60%;
        justify-content: space-between;
      }
      @media (min-width: 1600px) {
        width: 65%;
      }

      &-inner{
        width: 50%;
        &:not(:first-child) {
          border-left: 2px solid $color-neutral-positive-2;
        }
        @media (min-width: 550px) {
          &:not(:first-child) {
            border-left: none;
          }
        }

        .name {
          margin-left: 43px;
        }

      }

      .accounts {
        width: 50%;
        @media (min-width: 550px) {
          width: 70%;
        }
      }

    }

    .transaction-type-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      @media (min-width: 550px) {
        width: 40%;
        flex-direction: row;
      }
      @media (min-width: 1600px) {
        width: 35%;
      }

      .transaction-type-info-item {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-top: 2px solid $color-neutral-positive-2;
        padding: .6rem 0;
        margin-bottom: .6rem;
        @media (min-width: 550px) {
          border-top: none;
          width: 50%;
          flex-direction: column;
          border-left: 2px solid $color-neutral-positive-2;
        }

        .block {
          &:not(:first-child) {
            border-left: 2px solid $color-neutral-positive-2;
            border-top: none;
          }
          @media (min-width: 550px) {
            &:not(:first-child) {
              border-left: none;
              border-top: 2px solid $color-neutral-positive-2;
            }
          }
        }
      }

    }

  }
</style>
