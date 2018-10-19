<template>
  <div class="recent-blocks-partial">
    <div class="inner">
      <h2>Recent generations</h2>
      <p>View the latest generations on the aeternity blockchain</p>
      <table>
        <tr v-for='i in 3' :key="i">
          <td>
            <div class="block-number" v-if="generations.length">
              <router-link :to='"/generation/" + generations[i-1].keyBlock.height'>
                {{generations[i-1].keyBlock.height}}
              </router-link>
            </div>
            <div class="fill-dummy" v-else>
              &nbsp;
            </div>
          </td>
          <td>
            <span class='field-name'>Micro Blocks</span>
            <span class='field-value number' v-if="generations.length">
              {{generations[i-1].microBlocksDetailed.length}}
            </span>
            <span class="fill-dummy" v-else>
              &nbsp;
            </span>
          </td>
          <td>
            <span class='field-name'>Transactions</span>
            <span class='field-value number' v-if="generations.length">
              {{generations[i-1].numTransactions}}
            </span>
            <span class="fill-dummy" v-else>
              &nbsp;
            </span>
          </td>
          <td>
            <span class='field-name'>mined by</span>
            <span class="field-value account-address" v-if="generations.length">
              <router-link :to='"/account/" + generations[i-1].keyBlock.miner'>
                <named-address :address='generations[i-1].keyBlock.miner' />
              </router-link>
            </span>
            <span class="fill-dummy" v-else>
              &nbsp;
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import NamedAddress from '../../components/namedAddress'
import Loader from '../../components/loader'

export default {
  components: { NamedAddress, Loader },
  computed: mapState('blocks', {
    generations: ({ generations }) => generations.slice(1, 4)
  })
}
</script>
<style src='./recentBlocks.scss' lang='scss' />
