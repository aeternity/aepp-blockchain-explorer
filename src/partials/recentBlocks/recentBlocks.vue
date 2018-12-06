<template>
  <div class="recent-blocks-partial">
    <div class="inner">
      <h2>Recent generations</h2>
      <p>View the latest generations on the aeternity blockchain</p>
      <table>
        <tr
          v-for="(generation, i) in generations"
          :key="i">
          <td>
            <div
              v-if="generation"
              class="block-number">
              <router-link :to="&quot;/generation/&quot; + generation.keyBlock.height">
                {{ generation.keyBlock.height }}
              </router-link>
            </div>
            <fill-dummy v-else/>
          </td>
          <td>
            <span class="field-name">Micro Blocks</span>
            <span
              v-if="generation"
              class="field-value number">
              {{ generation.microBlocksDetailed.length }}
            </span>
            <fill-dummy v-else/>
          </td>
          <td>
            <span class="field-name">Transactions</span>
            <span
              v-if="generation"
              class="field-value number">
              {{ generation.numTransactions }}
            </span>
            <fill-dummy v-else/>
          </td>
          <td>
            <span class="field-name">beneficiary</span>
            <span
              v-if="generation"
              class="field-value account-address">
              <router-link :to="&quot;/account/&quot; + generation.keyBlock.beneficiary">
                <named-address :address="generation.keyBlock.beneficiary" />
              </router-link>
            </span>
            <fill-dummy v-else/>
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
  components: {NamedAddress, FillDummy},
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
