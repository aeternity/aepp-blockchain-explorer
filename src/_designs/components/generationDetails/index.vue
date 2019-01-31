<template>
  <div>
    <AppPanel>
      <AppTable details>
        <AppTableHeader>
          <AppTableRow>
            <AppTableRowColumn width="large">
              <AppTableCell>
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
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn width="small">
              <AppTableCell>
                <!--<TimeStamp :time="data.key_block.time" />-->
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
import AppTableRowColumn from '@/_designs/components/appTableRowColumn'
import AppDefinition from '@/_designs/components/appDefinition'
import AppPanel from '@/_designs/components/appPanel'
import BlockHeight from '@/_designs/components/blockHeight'
import LabelType from '@/_designs/components/labelType'
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
    // TimeStamp,
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

<style scoped></style>
