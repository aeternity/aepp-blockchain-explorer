<template>
  <div>
    <AppPanel>
      <AppTable details>
        <AppTableHeader>
          <AppTableRow>
            <AppTableRowColumn width="large">
              <AppTableCell extend>
                <div class="block-height-wrapper">
                  <div>
                    <LabelType
                      title="Block Height"
                      fill="black"
                    />
                  </div>
                  <BlockHeight :value="data.key_block.height" />
                  <div>
                    <Confirmations :value="dynamicData" />
                  </div>
                </div>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn width="small">
              <AppTableCell>
                <!--<TimeStamp :time="data.key_block.time" />-->
                <AppDefinition
                  class="container-last-inner"
                  title="Time since mined"
                >
                  <Age :time="data.key_block.time" />
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
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
import AppTable from '~/components/appTable'
import AppTableRow from '~/components/appTableRow'
import AppTableCell from '~/components/appTableCell'
import AppTableHeader from '~/components/appTableHeader'
import AppTableBody from '~/components/appTableBody'
import AppTableAccordion from '~/components/appTableAccordion'
import AppTableRowColumn from '~/components/appTableRowColumn'
import AppDefinition from '~/components/appDefinition'
import AppPanel from '~/components/appPanel'
import BlockHeight from '~/components/blockHeight'
import LabelType from '~/components/labelType'
import Age from '~/components/age'
// import TimeStamp from '~/components/timeStamp'
import FormatAeUnit from '~/components/formatAeUnit'
import FormatAddress from '~/components/formatAddress'
import Account from '~/components/account'
import Confirmations from '~/components/confirmations'
import FormatPow from '../formatPow'

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
  .block-height-wrapper {
    display: flex;
    flex-direction: column;
    @media (min-width: 550px) {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
