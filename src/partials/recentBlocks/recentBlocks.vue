<template>
  <div class="recent-blocks-partial">
    <div class="inner">
      <h2>Recent generations</h2>
      <p>View the latest generations on the aeternity blockchain</p>
      <table>
        <tr v-for='(generation, i) in generations' :key="i">
          <td>
            <div class="block-number" v-if="generation">
              <router-link :to='"/generation/" + generation.keyBlock.height'>
                {{generation.keyBlock.height}}
              </router-link>
            </div>
            <fill-dummy v-else/>
          </td>
          <td>
            <span class='field-name'>Micro Blocks</span>
            <span class='field-value number' v-if="generation">
              {{generation.microBlocksDetailed.length}}
            </span>
            <fill-dummy v-else/>
          </td>
          <td>
            <span class='field-name'>Transactions</span>
            <span class='field-value number' v-if="generation">
              {{generation.numTransactions}}
            </span>
            <fill-dummy v-else/>
          </td>
          <td>
            <span class='field-name'>mining beneficiary</span>
            <span class="field-value account-address" v-if="generation">
              <router-link :to='"/account/" + generation.keyBlock.beneficiary'>
                <named-address :address='generation.keyBlock.beneficiary' />
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
