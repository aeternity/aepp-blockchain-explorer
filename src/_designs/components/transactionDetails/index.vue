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
                  <BlockHeight :value="data.block_height" />
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
                  <Age :time="data.tx.time" />
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
          </AppTableRow>
        </AppTableHeader>
        <AppTableBody>
          <AppTableAccordion>
            <AppTableRow extend>
              <AppTableCell extend>
                <TxlistItem :data="data.tx" />
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Hash"
                >
                  <FormatAddress
                    :value="data.hash"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Ttl"
                >
                  {{ data.tx.ttl }}
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Nonce"
                >
                  {{ data.tx.nonce }}
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Signatures"
                >
                  <FormatAddress
                    :value="data.signatures[0]"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Version"
                >
                  {{ data.tx.version }}
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
import FormatAddress from '@/_designs/components/formatAddress'
import Confirmations from '@/_designs/components/confirmations'
import TxlistItem from '@/_designs/components/transactions/txListItem'

export default {
  name: 'TransactionDetails',
  components: {
    BlockHeight,
    AppTable,
    AppTableRow,
    AppTableCell,
    AppTableHeader,
    AppTableBody,
    AppTableRowColumn,
    AppDefinition,
    AppPanel,
    LabelType,
    AppTableAccordion,
    // TimeStamp,
    Age,
    FormatAddress,
    Confirmations,
    TxlistItem
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
