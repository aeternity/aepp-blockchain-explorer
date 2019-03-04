<template>
  <Component
    v-if="data.type"
    :is="data.type"
    :transaction="data"
  />
</template>

<script>
import SpendTx from '~/partials/transactions/txListType/spendTx.vue'
import OracleRegisterTx from '~/partials/transactions/txListType/oracleRegisterTx.vue'
import OracleExtendTx from '~/partials/transactions/txListType/oracleExtendTx.vue'
import OracleResponseTx from '~/partials/transactions/txListType/oracleResponseTx.vue'
import OracleQueryTx from '~/partials/transactions/txListType/oracleQueryTx.vue'
import NameClaimTx from '~/partials/transactions/txListType/nameClaimTx.vue'
import NamePreclaimTx from '~/partials/transactions/txListType/namePreclaimTx.vue'
import NameTransferTx from '~/partials/transactions/txListType/nameTransferTx.vue'
import NameUpdateTx from '~/partials/transactions/txListType/nameUpdateTx.vue'
import ContractCallTx from '~/partials/transactions/txListType/contractCallTx.vue'
import ContractCreateTx from '~/partials/transactions/txListType/contractCreateTx.vue'

export default {
  name: 'TXListItem',
  components: {
    SpendTx,
    OracleRegisterTx,
    OracleExtendTx,
    OracleResponseTx,
    OracleQueryTx,
    NameClaimTx,
    NamePreclaimTx,
    NameTransferTx,
    NameUpdateTx,
    ContractCallTx,
    ContractCreateTx
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
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
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

    /deep/ .transaction-main-info {
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

    /deep/ .transaction-type-info {
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
