<template>
  <div>
    <AppPanel>
      <AppTable details>
        <AppTableHeader>
          <AppTableRow>
            <AppTableCell extend>
              <div class="block-height-wrapper">
                <div class="container container-first">
                  <div class="container-frist-inner">
                    <LabelType
                      title="Block Height"
                      fill="black"
                    />
                  </div>
                  <BlockHeight :value="data.key_block.height" />
                </div>
                <div class="container container-last">
                  <div class="container-last-inner">
                    <Confirmations :value="dynamicData" />
                  </div>
                  <div class="container-last-inner">
                    <!--<TimeStamp :time="data.key_block.time" />-->
                    <AppDefinition
                      title="Time since mined"
                    >
                      <Age :time="data.key_block.time" />
                    </AppDefinition>
                  </div>
                </div>
              </div>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow>
            <AppTableRowColumn>
              <AppTableCell extend>
                <Account
                  :value="data.key_block.beneficiary"
                  title="beneficiary"
                  icon
                />
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn>
              <AppTableCell>
                <AppDefinition
                  title="Microblocks"
                >
                  {{ data.micro_blocks.length }}
                </AppDefinition>
              </AppTableCell>
              <AppTableCell>
                <AppDefinition
                  title="transactions"
                >
                  <FormatAeUnit
                    :value="data.key_block.tx"
                    type="tx"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRow
              extend
            >
              <AppTableCell>
                <AppDefinition
                  title="total"
                >
                  <FormatAeUnit
                    :value="data.key_block.total"
                    type="ae"
                  />
                </AppDefinition>
              </AppTableCell>
              <AppTableCell>
                <AppDefinition
                  title="Reward"
                >
                  <FormatAeUnit
                    :value="data.key_block.reward"
                    type="ae"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
          </AppTableRow>
        </AppTableHeader>
        <AppTableBody>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Hash"
              >
                <FormatAddress
                  :value="data.key_block.hash"
                  length="full"
                />
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Difficulty"
              >
                87472467200
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Target"
              >
                {{ data.key_block.target }}
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableAccordion>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Miner"
                >
                  <FormatAddress
                    :value="data.key_block.miner"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Nonce"
                >
                  {{ data.key_block.nonce }}
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Version"
                >
                  {{ data.key_block.version }}
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Prev hash"
                >
                  <FormatAddress
                    :value="data.key_block.prev_hash"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow
              extend
            >
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Prev key hash"
                >
                  <FormatAddress
                    :value="data.key_block.prev_key_hash"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="State hash"
                >
                  <FormatAddress
                    :value="data.key_block.state_hash"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Pow"
                >
                  <FormatPow :value="data.key_block.pow" />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
          </AppTableAccordion>
        </AppTableBody>
      </AppTable>
    </AppPanel>
  </div>
</template>

<script>
import AppTable from '@/_designs/components/appTable'
import AppTableRow from '@/_designs/components/appTableRow'
import AppTableCell from '@/_designs/components/appTableCell'
import AppTableHeader from '@/_designs/components/appTableHeader'
import AppTableBody from '@/_designs/components/appTableBody'
import AppTableAccordion from '@/_designs/components/appTableAccordion'
import AppTableRowColumn from '@/_designs/components/appTableRowColumn'
import AppDefinition from '@/_designs/components/appDefinition'
import AppPanel from '@/_designs/components/appPanel'
import BlockHeight from '@/_designs/components/blockHeight'
import LabelType from '@/_designs/components/labelType'
import Age from '@/_designs/components/age'
// import TimeStamp from '@/_designs/components/timeStamp'
import FormatAeUnit from '@/_designs/components/formatAeUnit'
import FormatAddress from '@/_designs/components/formatAddress'
import Account from '@/_designs/components/account'
import Confirmations from '@/_designs/components/confirmations'
import FormatPow from '../formatPow/index'

export default {
  name: 'GenerationDetails',
  components: {
    FormatPow,
    BlockHeight,
    AppTable,
    AppTableRow,
    AppTableCell,
    AppTableHeader,
    AppTableBody,
    AppTableRowColumn,
    AppDefinition,
    AppPanel,
    Account,
    LabelType,
    AppTableAccordion,
    // TimeStamp,
    Age,
    FormatAeUnit,
    FormatAddress,
    Confirmations
  },
  props: {
    data: {
      type: Object,
      default: undefined
    },
    dynamicData: {
      type: Number,
      default: undefined
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  .block-height-wrapper {
    display: flex;
    flex-direction: row;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 50%;
    @media (min-width: 550px) {
      flex-direction: row;
      align-items: center;
      position: relative;

    }
  }
  .container-first {
    justify-content: space-between;
    @media (min-width: 550px) {
      justify-content: flex-start;
      width: 50%;
    }

  }
  .container-last {
    flex-direction: column-reverse;
    border-left: 2px solid $color-neutral-positive-2;
    padding-right: .6rem;
    @media (min-width: 550px) {
      flex-direction: row;
      justify-content: flex-start;
      border-left: none;
      width: 50%;
      padding-right: 0;
    }
    &-inner{
      &:not(:last-child){
        border-top: 2px solid $color-neutral-positive-2;
        @media (min-width: 550px) {
          border-top: none;
        }
      }
      &:first-child {
        @media (min-width: 550px) {
          //margin-right: auto;
          width: 50%;
          padding-left: 1rem;
        }
      }
      &:last-child {
        @media (min-width: 550px) {
          width: 50%;
          border-left: 2px solid $color-neutral-positive-2;
          margin-left: auto;
          margin-right: -2px;
        }
        @media (min-width: 1600px) {
          width: 14.5%;
        }
      }
    }
  }
</style>
