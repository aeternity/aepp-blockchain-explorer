<template>
  <div>
    <AppPanel>
      <AppTable details>
        <AppTableHeader>
          <AppTableRow>
            <AppTableRowColumn width="large">
              <AppTableCell>
                <div>
                  {{ data.key_block.height }}
                  {{ confirmations }}
                </div>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn width="small">
              <AppTableCell>
                <time>
                  {{ data.key_block.time }}
                </time>
              </AppTableCell>
            </AppTableRowColumn>
          </AppTableRow>
          <AppTableRow>
            <AppTableRowColumn>
              <AppTableCell extend>
                <AppDefinition
                  title="benficiary"
                >
                  <AeText face="mono-xs">
                    {{ data.key_block.beneficiary }}
                  </AeText>
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn>
              <AppTableCell>
                <AppDefinition
                  title="Microblocks"
                >
                  <AeText face="mono-s">
                    {{ data.micro_blocks.length }}
                  </AeText>
                </AppDefinition>
              </AppTableCell>
              <AppTableCell>
                <AppDefinition
                  title="transactions"
                >
                  <AeText face="mono-s">
                    {{ data.key_block.transactions }}
                  </AeText>
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
                  <AeText face="mono-s">
                    {{ data.key_block.total }}
                  </AeText>
                </AppDefinition>
              </AppTableCell>
              <AppTableCell>
                <AppDefinition
                  title="Reward"
                >
                  <AeText face="mono-s">
                    {{ data.key_block.reward }}
                  </AeText>
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
                {{ data.key_block.hash }}
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Difficulty"
              >
                <AeText face="mono-s">
                  87472467200
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Target"
              >
                <AeText face="mono-s">
                  {{ data.key_block.target }}
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Miner"
              >
                <AeText face="mono-s">
                  {{ data.key_block.miner }}
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Nonce"
              >
                <AeText face="mono-s">
                  {{ data.key_block.nonce }}
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Version"
              >
                <AeText face="mono-s">
                  {{ data.key_block.version }}
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Prev hash"
              >
                <AeText face="mono-s">
                  {{ data.key_block.prev_hash }}
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow
            v-if="data.tx.gas"
            extend
          >
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Prev key hash"
              >
                <AeText face="mono-s">
                  {{ data.key_block.prev_key_hash }}
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="State hash"
              >
                <AeText face="mono-s">
                  {{ data.key_block.state_hash }}
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Pow"
              />
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
import AppTableCell from '@/_designs/components/appTableRowCell'
import AppTableHeader from '@/_designs/components/appTableHeader'
import AppTableBody from '@/_designs/components/appTableBody'
import AppTableRowColumn from '@/_designs/components/appTableRowColumn'
import AppDefinition from '@/_designs/components/appDefinition'
import AppPanel from '@/_designs/components/appPanel'

import { AeText } from '@aeternity/aepp-components-3'

export default {
  name: 'GenerationDetails',
  components: {
    AppTable,
    AppTableRow,
    AppTableCell,
    AppTableHeader,
    AppTableBody,
    AppTableRowColumn,
    AppDefinition,
    AeText,
    AppPanel
  },
  props: {
    data: {
      type: Object,
      default: undefined
    },
    confirmations: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style scoped></style>
