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
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="POW"
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
import FormatPow from '@/_designs/components/formatPow'

import { AeText, AeAddress } from '@aeternity/aepp-components-3'
const data = { 'key_block': { 'beneficiary': 'ak_nv5B93FPzRHrGNmMdTDfGdd5xGZvep3MVSpJqzcQmMp59bBCv', 'hash': 'kh_Va2FsFXHt42RzdVzpTukjHHyVZ4MvSEL7EFx7sbr5fdczncAb', 'height': 26786, 'miner': 'ak_5rqwhQWfUZWJAJiznVNM8jFZHFeauMfHtRpJTpyKeMNiFkA7e', 'nonce': 1.6789561608775383e19, 'pow': [38472579, 46230368, 51512306, 68121257, 69412257, 91251449, 116650308, 136382081, 146501665, 174663127, 195370028, 197616641, 211590209, 213119874, 216245496, 217076105, 217287334, 277608555, 286558564, 293381078, 342303628, 366941486, 380556027, 381586470, 388872653, 394385994, 398582184, 403663819, 422706146, 423839089, 445781230, 455480767, 467163814, 471713947, 471899369, 479429173, 486919464, 495746344, 517065938, 518992932, 525417977, 528014605], 'prev_hash': 'kh_2vi7hJTFHKvujkACyH7DdLm12inPj3QrDgRVVRFoFqo444jvxH', 'prev_key_hash': 'kh_2vi7hJTFHKvujkACyH7DdLm12inPj3QrDgRVVRFoFqo444jvxH', 'state_hash': 'bs_2sFTApvBRkuHVCCf4wX75KM619MUJpC1TMHbzjgMJQJYz2JVC2', 'target': 503932105, 'time': 1548173309689, 'version': 1 }, 'micro_blocks': [] }

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
    AppPanel,
    FormatPow
  },
  data: function () {
    return {
      data: data
    }
  }
}
</script>
<style lang="scss">
  /* For the AppTable Components
  // TODO: make a accordion component with flexible activator, ie can be placed on top and bottom by adding attribute
  */
.app-dashboard {}
</style>
