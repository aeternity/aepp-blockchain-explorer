<template>
  <div class="app-transaction">
    <h1>App-Transaction</h1>
    <AppPanel>
      <AppTable details>
        <AppTableHeader>
          <AppTableRow>
            <AppTableRowColumn width="large">
              <AppTableCell extend>
                <div class="app-block-height">
                  <LabelType
                    title="Block Height"
                  />
                  <span class="app-block-height-num">
                    6606081
                  </span>
                </div>
                <div class="app-block-confirmations">
                  <span class="app-block-confirmations-num">
                    235
                  </span>
                  <span class="app-block-confirmations-name">
                    Block Confirmations
                  </span>
                </div>
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
        </AppTableHeader>
      </AppTable>
    </AppPanel>
  </div>
</template>

<script>
import AppTable from '@/_designs/components/appTable'
import AppTableRow from '@/_designs/components/appTableRow'
import AppTableCell from '@/_designs/components/appTableCell'
import AppTableHeader from '@/_designs/components/appTableHeader'
import AppTableRowColumn from '@/_designs/components/appTableRowColumn'
import AppDefinition from '@/_designs/components/appDefinition'
import AppPanel from '@/_designs/components/appPanel'
import LabelType from '@/_designs/components/labelType'

import {
  AeText
} from '@aeternity/aepp-components-3'

export default {
  name: 'AppTransaction',
  components: {
    AppTable,
    AppTableRow,
    AppTableCell,
    AppTableHeader,
    AppTableRowColumn,
    AppDefinition,
    AppPanel,
    AeText,
    LabelType
  }
}
</script>

<style scoped>

</style>
