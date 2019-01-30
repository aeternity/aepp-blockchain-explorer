<template>
  <div class="app-generation-details">
    <h1>Generation  Details</h1>
    <AppPanel>
      <AppTable details>
        <AppTableHeader>
          <AppTableRow>
            <AppTableRowColumn width="large">
              <AppTableCell extend>
                <div class="app-block-height">
                  <div>
                    <LabelType
                      title="Block Height"
                      fill="black"
                    />
                  </div>
                  <span class="app-block-height-num">
                    6606081
                  </span>
                  <Confirmations :value="confirmations" />
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
          <AppTableRow>
            <AppTableRowColumn width="medium">
              <AppTableCell extend>
                <!--<AccountGroup>-->
                <!--<Account-->
                <!--:value="data.key_block.beneficiary"-->
                <!--title="Sender"-->
                <!--icon-->
                <!--/>-->
                <!--<Account-->
                <!--:value="data.key_block.beneficiary"-->
                <!--title="Recipient"-->
                <!--icon-->
                <!--/>-->
                <!--</AccountGroup>-->
                <AppDefinition
                  title="Beneficiary"
                >
                  <FormatAddress
                    :value="data.key_block.beneficiary"
                    length="responsive"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn>
              <AppTableCell>
                <AppDefinition
                  title="Age"
                >
                  <Age :time="1547668877573" />
                </AppDefinition>
              </AppTableCell>
              <AppTableCell>
                <AppDefinition
                  title="Transactions"
                >
                  <AeText face="mono-s">
                    1,230
                  </AeText>
                </AppDefinition>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRow
              extend
            >
              <AppTableCell>
                <AppDefinition
                  title="Total"
                >
                  <AeText face="mono-s">
                    92,300.10 <abbr
                      class="currency"
                      title="aeternity"
                    >
                      AE
                    </abbr>
                  </AeText>
                </AppDefinition>
              </AppTableCell>
              <AppTableCell>
                <AppDefinition
                  title="Reward"
                >
                  <AeText face="mono-s">
                    987.00 <abbr
                      class="currency"
                      title="aeternity"
                    >
                      AE
                    </abbr>
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
                  536930672
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
                <span>
                  ak_  25 UQc Zb8 caG m8q vs6 nNy KmS eSK Xya AKg ow5 8XL VEZ mBk Pmr L5N
                </span>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Nonce"
              >
                <AeText face="mono-s">
                  202
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Version"
              >
                <AeText face="mono-s">
                  1
                </AeText>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Prev Hash"
              >
                <span>
                  mh_  25 UQc Zb8 caG m8q vs6 nNy KmS eSK Xya AKg ow5 8XL VEZ mBk Pmr L5N
                </span>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="Prev Key Hash"
              >
                <span>
                  kh_  s6 nNy KmS eSK Xya AKg ow5 8XL VEZ mBk Pmr L5N g25 UQc Zb8 caG m8q
                </span>
              </AppDefinition>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow extend>
            <AppTableCell extend>
              <AppDefinition
                type="list"
                title="State Hash"
              >
                <span>
                  bs_  25 UQc Zb8 caG m8q vs6 nNy KmS eSK Xya AKg ow5 8XL VEZ mBk Pmr L5N
                </span>
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
import Age from '@/_designs/components/age'
import FormatPow from '@/_designs/components/formatPow'
import LabelType from '@/_designs/components/labelType'

import { AeText } from '@aeternity/aepp-components-3'
import FormatAddress from '../../components/formatAddress/formatAddress'
import Confirmations from '../../components/confirmations'

// import AccountGroup from '../../components/accountGroup'
// import Account from '../../components/account/index'

const generationData = {
  'key_block': {
    'beneficiary': 'ak_542o93BKHiANzqNaFj6UurrJuDuxU61zCGr9LJCwtTUg34kWt',
    'hash': 'kh_bYoiQhCxsS8RNhbumWan7WVwRb9yqoYmK4fbpVaeK6QxdpGvW',
    'height': 29520,
    'miner': 'ak_9sX7cqm1juxd2CQ9KtoF4GUFbAMtz4K3rAkk8nZ1WjsrRaXVz',
    'nonce': 249211865583603,
    'pow': [
      15716933,
      21248494,
      31777385,
      51629097,
      52307438,
      60314379,
      77015848,
      111225783,
      129181552,
      132689424,
      137592480,
      147779189,
      157115594,
      159419405,
      196924597,
      224550827,
      247674216,
      255348542,
      259500283,
      273293538,
      274438493,
      291412994,
      293670763,
      302377574,
      303350137,
      312112679,
      334581844,
      336923970,
      336983229,
      354918023,
      355296365,
      376120031,
      392530749,
      423359953,
      435415471,
      438152264,
      441899177,
      448727944,
      491290085,
      500541757,
      530335760,
      531882689
    ],
    'prev_hash': 'kh_2QvUEsbG25JRApPGarpSZYootptdS8yrPa3AaABR2b5bTiyZVq',
    'prev_key_hash': 'kh_2QvUEsbG25JRApPGarpSZYootptdS8yrPa3AaABR2b5bTiyZVq',
    'state_hash': 'bs_jS1VPZyvoXggfUdQTGtVrpFTZdSRFgWhoHYJKecgbAp6cGeHZ',
    'target': 504509498,
    'time': 1548670493483,
    'version': 1
  },
  'micro_blocks': []
}

export default {
  name: 'AppGenerationDetails',
  components: {
    Confirmations,
    FormatAddress,
    // Account,
    // AccountGroup,
    AppTable,
    AppTableRow,
    AppTableCell,
    AppTableHeader,
    AppTableBody,
    AppTableRowColumn,
    AppDefinition,
    AppPanel,
    AeText,
    LabelType,
    Age,
    FormatPow
  },
  data: function () {
    return {
      data: generationData,
      confirmations: 535
    }
  }
}
</script>

<style scoped lang="scss">

  .currency {
    font-size: .7em;
    margin-left: -.5em;
    text-decoration: none;
  }
  .app-block-height {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    &-num {
      margin-left: .6rem;
      @media (max-width: 449px) {
        margin-top: .6rem;
        font-weight: 500;
      }
      @media (min-width: 450px) {
      font-size: 1.7rem;
    }
    }
    &-wrapper {
      display: flex;
    }
  }
</style>
