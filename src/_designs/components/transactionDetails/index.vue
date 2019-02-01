<template>
  <div class="transaction-details">
    <AppPanel>
      <AppTable details>
        <AppTableBody>
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
        </AppTableBody>
      </AppTable>
    </AppPanel>
  </div>
</template>

<script>
import AppTable from '@/_designs/components/appTable'
import AppTableRow from '@/_designs/components/appTableRow'
import AppTableCell from '@/_designs/components/appTableCell'
import AppTableBody from '@/_designs/components/appTableBody'
import AppDefinition from '@/_designs/components/appDefinition'
import AppPanel from '@/_designs/components/appPanel'
import FormatAddress from '@/_designs/components/formatAddress'
import TxlistItem from '@/_designs/components/transactions/txListItem'

export default {
  name: 'TransactionDetails',
  components: {
    AppTable,
    AppTableRow,
    AppTableCell,
    AppTableBody,
    AppDefinition,
    AppPanel,
    // TimeStamp,
    FormatAddress,
    TxlistItem
  },
  props: {
    data: {
      type: Object,
      default: undefined
    }
  }
}
</script>

<style scoped lang="scss">
  .transaction-details {
    margin-top: 2rem;
  }
  .block-height-wrapper {
    display: flex;
    flex-direction: column;
    @media (min-width: 550px) {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
