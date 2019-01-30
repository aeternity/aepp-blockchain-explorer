<template>
  <AppTableHeader>
    <AppTableRow>
      <AppTableRowColumn width="medium">
        <AppTableCell>
          <div class="app-block-height">
            <div>
              <LabelType
                title="block height"
                fill="black"
              />
            </div>
            <BlockHeight :value="data.key_block.height" />
            <Account
              :value="data.key_block.beneficiary"
              title="Sender"
              icon
            />
          </div>
        </AppTableCell>
      </AppTableRowColumn>
      <AppTableRowColumn>
        <AppTableRow
          nested
        >
          <AppTableCell>
            <AppDefinition
              title="Time since mined"
            >
              <Age :time="data.key_block.time" />
            </AppDefinition>
          </AppTableCell>
          <AppTableCell>
            <AppDefinition
              title="Transactions"
            >
              <FormatAeUnit
                :value="data.key_block.total"
                type="tx"
              />
            </AppDefinition>
          </AppTableCell>
        </AppTableRow>
        <AppTableRow
          nested
        >
          <AppTableCell>
            <AppDefinition
              title="Total"
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
                :value="data.key_block.total"
                type="ae"
              />
            </AppDefinition>
          </AppTableCell>
        </AppTableRow>
      </AppTableRowColumn>
    </AppTableRow>
  </AppTableHeader>
</template>

<script>

import AppTableRow from '@/_designs/components/appTableRow'
import AppTableCell from '@/_designs/components/appTableCell'
import AppTableHeader from '@/_designs/components/appTableHeader'
import AppTableRowColumn from '@/_designs/components/appTableRowColumn'
import AppDefinition from '@/_designs/components/appDefinition'
import FormatAeUnit from '@/_designs/components/formatAeUnit'
import Account from '@/_designs/components/account'
import Age from '@/_designs/components/age'
import LabelType from '@/_designs/components/labelType'
import BlockHeight from '@/_designs/components/blockHeight'

export default {
  name: 'Index',
  components: {
    BlockHeight,
    LabelType,
    AppTableHeader,
    AppTableRow,
    AppTableRowColumn,
    AppTableCell,
    AppDefinition,
    FormatAeUnit,
    Account,
    Age
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
  .app-block-height {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
