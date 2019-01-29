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
                  <span class="app-block-height-label">
                    Block Height
                  </span>
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
          <AppTableRow>
            <AppTableRowColumn>
              <AppTableCell extend>
                <div class="app-definition-account">
                  <AeIdenticon
                    address="ak_QY8VNEkhj7omMUjAvfVBq2NjTDy895LBYbk7qVxQo1qT8VqfE"
                  />
                  <AppDefinition
                    title="Beneficiary"
                  >
                    <AeAddress
                      value="ak_QY8VNEkhj7omMUjAvfVBq2NjTDy895LBYbk7qVxQo1qT8VqfE"
                      length="short"
                    />
                    <AeIcon name="copy" />
                  </AppDefinition>
                </div>
              </AppTableCell>
            </AppTableRowColumn>
            <AppTableRowColumn>
              <AppTableCell>
                <AppDefinition
                  title="Age"
                >
                  <Age :time="1548668877573" />
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
                <span>
                  kh_  25 UQc Zb8 caG m8q vs6 nNy KmS eSK Xya AKg ow5 8XL VEZ mBk Pmr L5N
                </span>
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
                <span>
                  1877  2156  2740  2933  3223  4184  4388  5679  6076  6368  6397  6542  8218  8653
                  10525 11377 13894 14969 15654 16121 17697 17741 18383 18420 18833 21641 22692 23027
                  24838 25814 25933 26069 26464 26903 26944 28659 29277 30479 30642 30865 31523 32336
                </span>
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

import { AeAddress, AeIcon, AeIdenticon, AeText } from '@aeternity/aepp-components-3'
export default {
  name: 'AppGenerationDetails',
  components: {
    AppTable,
    AppTableRow,
    AppTableCell,
    AppTableHeader,
    AppTableBody,
    AppTableRowColumn,
    AppDefinition,
    AeAddress,
    AeIdenticon,
    AeIcon,
    AppPanel,
    AeText,
    Age
  }
}
</script>

<style scoped lang="scss">
  .app-definition-account {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: .8rem;
  }

  .currency {
    font-size: .7em;
    margin-left: -.5em;
    text-decoration: none;
  }

</style>
