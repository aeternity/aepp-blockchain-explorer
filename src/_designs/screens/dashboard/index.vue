<template>
  <div class="app-dashboard">
    <h1>App-Dashboard</h1>
    <!-- static table -->
    <AppPanel>
      <AppTable details>
        <AppTableHeader>
          <AppTableRow>
            <AppTableRowColumn width="large">
              <AppTableCell>
                <AppDefinition
                  title="confirmations"
                >
                  <AeText face="mono-s">
                    235
                  </AeText>
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn width="small">
              <AppTableCell>
                <AppDefinition
                  title="October 11 2018"
                >
                  <AeText face="mono-s">
                    10:59:34 AM +UTC
                  </AeText>
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
          </AppTableRow>
          <AppTableRow>
            <AppTableRowColumn>
              <AppTableCell extend>
                <AppDefinition
                  title="confirmations"
                >
                  <AeText face="mono-s">
                    235
                  </AeText>
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn>
              <AppTableCell>
                <AppDefinition
                  title="Amount"
                >
                  <AeText face="mono-s">
                    10.00AE
                  </AeText>
                </AppDefinition>
              </AppTableCell>
              <AppTableCell>
                <AppDefinition
                  title="confirmations"
                >
                  <AeText face="mono-s">
                    235
                  </AeText>
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
          </AppTableRow>
          <AppTableRow>
            <AppTableRowColumn>
              <AppTableCell extend>
                <AppDefinition
                  title="confirmations"
                >
                  <AeText face="mono-s">
                    235
                  </AeText>
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn>
              <AppTableCell>
                <AppDefinition
                  title="confirmations"
                >
                  <AeText face="mono-s">
                    235
                  </AeText>
                </AppDefinition>
              </AppTableCell>
              <AppTableCell>
                <AppDefinition
                  title="confirmations"
                >
                  <AeText face="mono-s">
                    235
                  </AeText>
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRow
              extend
            >
              <AppTableCell>
                <AppDefinition
                  title="confirmations"
                >
                  <AeText face="mono-s">
                    235
                  </AeText>
                </AppDefinition>
              </AppTableCell>
              <AppTableCell>
                <AppDefinition
                  title="confirmations"
                >
                  <AeText face="mono-s">
                    235
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
                <AeAddress
                  value="ak_QY8VNEkhj7omMUjAvfVBq2NjTDy895LBYbk7qVxQo1qT8VqfE"
                  length="flat"
                  face="mono-s"
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
                  87472467200
                </AeText>
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
import AppTableCell from '@/_designs/components/appTableRowCell'
import AppTableHeader from '@/_designs/components/appTableHeader'
import AppTableBody from '@/_designs/components/appTableBody'
import AppTableRowColumn from '@/_designs/components/appTableRowColumn'
import AppDefinition from '@/_designs/components/appDefinition'
import AppPanel from '@/_designs/components/appPanel'

import { AeText, AeAddress } from '@aeternity/aepp-components-3'

const transactions = [
  {
    'block_hash': 'mh_Gy3fyo2kqHGYoHPGEdhsctYpeBVLdBJypmra35RftLRH659pi',
    'block_height': 7033,
    'hash': 'th_pbqRbznJVqg7wc1YHvozNQiLf9RUTpwjCcgS5H5v7ERQGRcVZ',
    'signatures': [
      'sg_ShZnBv6ta64un3C2QpSRjgSxpZj8k76uP46yUvnhfAC6U5LC5RX2gUvmsDVk9kRknPPRXoSLXE53sqcxrXR7hhNxsGJNu', 'sg_ShZnBv6ta64un3C2QpSRjgSxpZj8k76uP46yUvnhfAC6U5LC5RX2gUvmsDVk9kRknPPRXoSLXE53sqcxrXR7hhNxsGJNu'
    ],
    'tx': {
      'amount': 100000000000000,
      'fee': 20000,
      'nonce': 7,
      'payload': '12345',
      'recipient_id': 'ak_25AVkWKP3nm6NFt1jU3PHh5vCpxVzLs7CaadjSE2ENoZpk8Wgy',
      'sender_id': 'ak_sLbiaANfRJV32QA6c2H7Q323RingZenWbBdnhVmrYYmTND6RP',
      'ttl': 7533,
      'type': 'SpendTx',
      'version': 1,
      'pow': '1877215627402933322341844388567960766368639765428218865310525113771389414969156541612117697177411838318420188332164122692230272483825814259332606926464269032694428659292773047930642308653152332336'
    }
  }
]

export default {
  name: 'AppDashboard',
  components: {
    AppTable,
    AppTableRow,
    AppTableCell,
    AppTableHeader,
    AppTableBody,
    AppTableRowColumn,
    AppDefinition,
    AeText,
    AeAddress,
    AppPanel
  },
  data: function () {
    return { transactions: transactions }
  }
}
</script>
<style lang="scss">
  /* For the AppTable Components
  // TODO: make a accordion component with flexible activator, ie can be placed on top and bottom by adding attribute
  */
.app-dashboard {}
</style>
