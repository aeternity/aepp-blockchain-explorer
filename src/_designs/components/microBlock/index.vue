<template>
  <section class="micro-block">
    <AppPanel>
      <AppTable details>
        <AppTableBody>
          <AppTableAccordion type="bottom">
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
                  87472467200
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Target"
                >
                  {{ data.key_block.target }}
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Miner"
                >
                  <FormatAddress
                    :value="data.key_block.miner"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Nonce"
                >
                  {{ data.key_block.nonce }}
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Version"
                >
                  {{ data.key_block.version }}
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Prev hash"
                >
                  <FormatAddress
                    :value="data.key_block.prev_hash"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow
              extend
            >
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="Prev key hash"
                >
                  <FormatAddress
                    :value="data.key_block.prev_key_hash"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
            <AppTableRow extend>
              <AppTableCell extend>
                <AppDefinition
                  type="list"
                  title="State hash"
                >
                  <FormatAddress
                    :value="data.key_block.state_hash"
                    length="full"
                  />
                </AppDefinition>
              </AppTableCell>
            </AppTableRow>
          </AppTableAccordion>
          <slot />
        </AppTableBody>
      </AppTable>
    </AppPanel>
  </section>
</template>
<script>
import AppTable from '@/_designs/components/appTable'
import AppTableRow from '@/_designs/components/appTableRow'
import AppTableCell from '@/_designs/components/appTableCell'
import AppTableBody from '@/_designs/components/appTableBody'
import AppTableAccordion from '@/_designs/components/appTableAccordion'
import AppDefinition from '@/_designs/components/appDefinition'
import AppPanel from '@/_designs/components/appPanel'
// import TimeStamp from '@/_designs/components/timeStamp'
import FormatAddress from '@/_designs/components/formatAddress'

export default {
  name: 'MicroBlock',
  components: {
    AppTable,
    AppTableRow,
    AppTableCell,
    AppTableBody,
    AppDefinition,
    AppPanel,
    AppTableAccordion,
    // TimeStamp,
    FormatAddress
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
    .micro-block {
      margin-bottom: 2rem;
      position: relative;
      &:first-child {
        &:before {
          content: '';
          display: block;
          width: 2px;
          height: 2rem;
          background-color: $color-neutral-positive-1;
          opacity: .5;
          position: absolute;
          top:-2rem;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      &:after {
        content: '';
        display: block;
        width: 2px;
        height: 2rem;
        background-color: $color-neutral-positive-1;
        opacity: .5;
        position: absolute;
        top:-2rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
</style>
