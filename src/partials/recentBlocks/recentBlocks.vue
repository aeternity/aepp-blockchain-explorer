<template>
  <div class="recent-blocks-partial">
    <div class="inner">
      <h2>Recent blocks</h2>
      <p>View the latest blocks on the aeternity blockchain</p>
      <table>
        <tr v-for='b in blocks'>
          <template v-if="b">
            <td>
              <div class="block-number">
                <router-link :to='"/block/" + b.height'>
                  {{b.height}}
                </router-link>
              </div>
            </td>
            <td>
              <span class='field-name'>Transactions</span>
              <span class='field-value number'>
                {{b.transactions.length}}
              </span>
            </td>
            <td>
              <span class='field-name'>mined by</span>
              <span class="field-value account-address">
                <router-link :to='"/account/" + b.miner'>
                  <named-address :address='b.miner' />
                </router-link>
              </span>
            </td>
          </template>
          <template v-else>
            Loading..
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  /*
   * Map blocks to the component
   */
  computed: mapState('blocks', [
    'blocks'
  ]),

  /*
   * Get the last 3 blocks on mount
   */
  mounted: function () {
    return this
    .$store
    .dispatch('blocks/getLatestBlocks', 3)
  }
}
</script>
<style src='./recentBlocks.scss' lang='scss' />
