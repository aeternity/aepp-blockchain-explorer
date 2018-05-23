<template>
  <div class="recent-blocks-partial">
    <div class="inner">
      <h2>Recent blocks</h2>
      <p>View the latest blocks on the aeternity blockchain</p>
      <table>
        <tr v-for='b in recentBlocks'>
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
                <router-link :to='"/account/" + b.minedBy'>
                  <named-address :address='b.minedBy' />
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
import NamedAddress from '../../components/namedAddress/namedAddress.vue'
import { mapState } from 'vuex'
import _ from 'lodash'
export default {
  components: {
    NamedAddress
  },
  computed: mapState({
    recentBlocks: state => _.times(3, idx => state.blocks[state.height - idx - 1])
  })
}
</script>
<style src='./recentBlocks.scss' lang='scss' />
