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
import AppTable from '~/components/appTable'
import AppTableRow from '~/components/appTableRow'
import AppTableCell from '~/components/appTableCell'
import AppTableBody from '~/components/appTableBody'
import AppTableAccordion from '~/components/appTableAccordion'
import AppDefinition from '~/components/appDefinition'
import AppPanel from '~/components/appPanel'
// import TimeStamp from '~/components/timeStamp'
import FormatAddress from '~/components/formatAddress'

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
