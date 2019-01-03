<template>
  <div class="recent-blocks-partial">
    <div class="inner">
      <h2>Recent generations</h2>
      <table>
        <tr
          v-for="(generation, i) in generations"
          :key="i"
        >
          <td>
            <div
              v-if="generation"
              class="block-number"
            >
              <RouterLink :to="&quot;/generation/&quot; + generation.keyBlock.height">
                {{ generation.keyBlock.height }}
              </RouterLink>
            </div>
            <FillDummy v-else />
          </td>
          <td>
            <span class="field-name">
              Micro Blocks
            </span>
            <span
              v-if="generation"
              class="field-value number"
            >
              {{ generation.microBlocks.length }}
            </span>
            <FillDummy v-else />
          </td>
          <td>
            <span class="field-name">
              Transactions
            </span>
            <span
              v-if="generation"
              class="field-value number"
            >
              {{ generation.numTransactions }}
            </span>
            <FillDummy v-else />
          </td>
          <td>
            <span class="field-name">
              beneficiary
            </span>
            <span
              v-if="generation"
              class="field-value account-address"
            >
              <RouterLink :to="&quot;/account/&quot; + generation.keyBlock.beneficiary">
                <NamedAddress :address="generation.keyBlock.beneficiary" />
              </RouterLink>
            </span>
            <FillDummy v-else />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import NamedAddress from '../../components/namedAddress'
import FillDummy from '../../components/fillDummy'
import range from 'lodash/range'

export default {
  components: { NamedAddress, FillDummy },
  computed:
    mapState('blocks', {
      generations (state) {
        return range(state.height - 3, state.height).map(
          (i) => state.generations[i]
        )
      }
    })
}
</script>
<style src='./recentBlocks.scss' lang='scss' />
