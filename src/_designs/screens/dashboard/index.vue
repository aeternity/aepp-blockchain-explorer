<template>
  <div class="app-dashboard">
    <h1>App-Dashboard</h1>
    <!-- static table -->
    <AppTable details>
      <AppTableHeader>
        <AppTableHeaderRow reorder>
          <AppTableHeaderRowCell extend>
            <AeText
              slot="title"
              face="uppercase-xs"
            >
              Reordered flow
            </AeText>
            <AeText face="mono-xs">
              6606081
            </AeText>
          </AppTableHeaderRowCell>
          <AppTableHeaderRowCell>
            <AeText
              slot="title"
              face="uppercase-xs"
            >
              date time
            </AeText>
            <AeText face="mono-xs">
              6606081
            </AeText>
          </AppTableHeaderRowCell>
          <AppTableHeaderRowCell>
            <AeText
              slot="title"
              face="uppercase-xs"
            >
              confirmations
            </AeText>
            <AeText face="mono-xs">
              235
            </AeText>
          </AppTableHeaderRowCell>
        </AppTableHeaderRow>
        <AppTableHeaderRow>
          <AppTableHeaderRowCell extend>
            <AeText
              slot="title"
              face="uppercase-xs"
            >
              natural flow
            </AeText>
            <AeText face="mono-xs">
              6606081
            </AeText>
          </AppTableHeaderRowCell>
          <AppTableHeaderRowCell>
            <AeText
              slot="title"
              face="uppercase-xs"
            >
              date time
            </AeText>
            <AeText face="mono-xs">
              6606081
            </AeText>
          </AppTableHeaderRowCell>
          <AppTableHeaderRowCell>
            <AeText
              slot="title"
              face="uppercase-xs"
            >
              confirmations
            </AeText>
            <AeText face="mono-xs">
              235
            </AeText>
          </AppTableHeaderRowCell>
        </AppTableHeaderRow>
        <AppTableHeaderRow>
          <AppTableHeaderColumn>
            <AppTableHeaderRowCell extend>
              <AeText
                slot="title"
                face="uppercase-xs"
              >
                blockheight
              </AeText>
              <AeText face="mono-xs">
                6606081
              </AeText>
            </AppTableHeaderRowCell>
          </AppTableHeaderColumn>
          <AppTableHeaderColumn>
            <AppTableHeaderRow nested>
              <AppTableHeaderRowCell>
                <AeText
                  slot="title"
                  face="uppercase-xs"
                >
                  blockheight
                </AeText>
                <AeText face="mono-xs">
                  6606081
                </AeText>
              </AppTableHeaderRowCell>
              <AppTableHeaderRowCell>
                <AeText
                  slot="title"
                  face="uppercase-xs"
                >
                  blockheight
                </AeText>
                <AeText face="mono-xs">
                  6606081
                </AeText>
              </AppTableHeaderRowCell>
            </AppTableHeaderRow>
          </AppTableHeaderColumn>
          <AppTableHeaderRow
            nested
            extend
          >
            <AppTableHeaderRowCell>
              <AeText
                slot="title"
                face="uppercase-xs"
              >
                confirmations
              </AeText>
              <AeText face="mono-xs">
                234
              </AeText>
            </AppTableHeaderRowCell>
            <AppTableHeaderRowCell>
              <AeText
                slot="title"
                face="uppercase-xs"
              >
                blockheight
              </AeText>
              <AeText face="mono-xs">
                6606081
              </AeText>
            </AppTableHeaderRowCell>
          </AppTableHeaderRow>
        </AppTableHeaderRow>
      </apptableheader>
      <AppTableRow extend>
        <AppTableRowCell>
          <AeText
            slot="title"
            face="uppercase-xs"
          >
            Difficulty
          </AeText>
          <AeText face="mono-s">
            87472467200
          </AeText>
        </AppTableRowCell>
        <AppTableRowCell>
          <AeText
            slot="title"
            face="uppercase-xs"
          >
            Target
          </AeText>
          <AeText face="mono-s">
            87472467200
          </AeText>
        </AppTableRowCell>
        <AppTableRow>
          <AppTableRowCell extend>
            <AeText
              slot="title"
              face="uppercase-xs"
            >
              Hash
            </AeText>
            <AeAddress
              value="ak_QY8VNEkhj7omMUjAvfVBq2NjTDy895LBYbk7qVxQo1qT8VqfE"
              length="flat"
              face="mono-s"
            />
          </AppTableRowCell>
        </AppTableRow>
      </AppTableRow>
    </AppTable>
  </div>
</template>
<script>
import AppTable from '@/_designs/components/appTable'
import AppTableRow from '@/_designs/components/appTableRow'
import AppTableRowCell from '@/_designs/components/appTableRowCell'
import AppTableHeader from '@/_designs/components/appTableHeader'
import AppTableHeaderRow from '@/_designs/components/appTableHeaderRow'
import AppTableHeaderColumn from '@/_designs/components/appTableHeaderColumn'
import AppTableHeaderRowCell from '@/_designs/components/appTableHeaderRowCell'

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
    AppTableRowCell,
    AppTableHeader,
    AppTableHeaderRow,
    AppTableHeaderColumn,
    AppTableHeaderRowCell,
    AeText,
    AeAddress
  },
  data: function () {
    return { transactions: transactions }
  }
}
</script>
<style lang="scss">
  /* For the AppTable Components
  // TODO: try and combine AppTableHeader components with AppTable components
  // TODO: extract AppTableRowCellTitle and AppTableRowCellContent into separate components
  // TODO: make a AppTableBody component
  // TODO: make a accordion component with flexible activator, ie can be placed on top and bottom by adding attribute
  */
.app-dashboard {}
</style>
