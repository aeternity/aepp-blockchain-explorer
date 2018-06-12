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
                <!--<router-link :to='"/account/" + b.minedBy'>-->
                  <!--<named-address :address='b.minedBy' />-->
                <!--</router-link>-->
                {{ b.minedBy }}
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

export default {
  components: { NamedAddress },
  computed: mapState('blocks', ['blocks']),
  mounted: function () {
    return this
    .$store
    .dispatch('blocks/getLatestBlocks', 3)
  }
}
</script>
<style src='./recentBlocks.scss' lang='scss' />
