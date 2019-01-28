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
                    fill="black"
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
                <TimeSince
                  :time="1548668877573"
                  is-header
                />
              </AppTableCell>
            </AppTableRowColumn>
          </AppTableRow>
        </AppTableHeader>
        <AppTableBody>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Hash"
              >
                <span>
                  kh_  25 UQc Zb8 caG m8q vs6 nNy KmS eSK Xya AKg ow5 8XL VEZ mBk Pmr L5N
                </span>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Data"
              >
                <TimeSince
                  :time="1548668877573"
                />
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
import AppTableRowColumn from '@/_designs/components/appTableRowColumn'
import AppDefinition from '@/_designs/components/appDefinition'
import AppPanel from '@/_designs/components/appPanel'
import LabelType from '@/_designs/components/labelType'
import TimeSince from '@/_designs/components/timeSince'
import AppTableBody from '@/_designs/components/appTableBody'

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
    LabelType,
    TimeSince,
    AppTableBody
  }
}
</script>

<style scoped>

</style>
