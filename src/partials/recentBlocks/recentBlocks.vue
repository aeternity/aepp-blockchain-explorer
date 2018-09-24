<template>
  <div class="recent-blocks-partial">
    <div class="inner">
      <h2>Recent generations</h2>
      <p>View the latest generations on the aeternity blockchain</p>
      <v-wait for="loading recent generations">
        <ae-loader slot="waiting" class="loader"/>

        <table>
        <tr v-for='(b, i) in generations.slice(0, 3)' :key="i" v-if="generations.length">
          <template v-if="b">
            <td>
              <div class="block-number">
                <router-link :to='"/generation/" + b.keyBlock.height'>
                  {{b.keyBlock.height}}
                </router-link>
              </div>
            </td>
            <td>
              <span class='field-name'>Micro Blocks</span>
              <span class='field-value number'>
                {{b.micros.length}}
              </span>
            </td>
            <td>
              <span class='field-name'>Transactions</span>
              <span class='field-value number'>
                {{b.transactionNumber}}
              </span>
            </td>
            <td>
              <span class='field-name'>mined by</span>
              <span class="field-value account-address">
                <router-link :to='"/account/" + b.keyBlock.miner'>
                  <named-address :address='b.keyBlock.miner' />
                </router-link>
              </span>
            </td>
          </template>
          <template v-else>
            Loading..
          </template>
        </tr>
      </table>
      </v-wait>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import NamedAddress from '../../components/namedAddress'
import { AeLoader } from '@aeternity/aepp-components'

export default {
  components: { NamedAddress, AeLoader },
  computed: mapState('blocks', [
    'generations'
  ]),
  mounted: async function () {
    this.$store.dispatch('wait/start', 'loading recent generations', { root: true })
    await this.$store.dispatch('blocks/getLatestGenerations', 10)
    this.$store.dispatch('wait/end', 'loading recent generations', { root: true })
  }
}
</script>
<style src='./recentBlocks.scss' lang='scss' />
