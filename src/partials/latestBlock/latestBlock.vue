<template>
  <div class="latest-block-partial">
    <div class="grid">
      <div class="explanation">
        <h2 class='title'>Latest Block</h2>
        <ae-button type='exciting' size='small' :to='"/block/" + height'>
          view last
        </ae-button>
        <ae-button type='exciting' size='small' to='/blocks'>
          view all
        </ae-button>
      </div>
      <div class="block-data">
        <div class="grid block-basic-info">
          <div class='number chain-height'>
            <img src="@/assets/block.svg" alt=""/>
            <router-link :to="'/block/'+ height">
              {{height}}
            </router-link>
          </div>
          <div class='ago'>
            <span>mined</span>
            <!--<relative-time :ts="currentTime - block.time" big />-->
            <span>ago</span>
          </div>
        </div>
        <div class="grid block-extended-info">
          <div class='field'>
            <div class="field-name">Hash</div>
            <div class='field-value block-hash'>
              <!--<router-link :to="'/block/'+block.hash">-->
                <!--<ae-hash type='short' :hash='block.hash'/>-->
              <!--</router-link>-->
            </div>
          </div>
          <div class='field'>
            <div class='field-name'>Transactions</div>
            <div class="field-value number">
                <!--{{block.transactions.length}}-->
            </div>
          </div>
          <div class='field'>
            <div class='field-name'>Mined by</div>
            <div class="field-value account-address">
              <!--<router-link :to='"/account/" + block.minedBy'>-->
              <!--<named-address :address='block.minedBy' />-->
              <!--</router-link>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import {
  AeButton
} from '@aeternity/aepp-components'

import RelativeTime from '../../components/relativeTime.vue'
import currentTime from '../../mixins/currentTime'
import NamedAddress from '../../components/namedAddress/namedAddress.vue'
import AeHash from '../../components/aeHash/aeHash.vue'

export default {
  /*
   * Section Components
   */
  components: {
    AeButton,
    RelativeTime,
    AeHash,
    NamedAddress
  },

  /*
   * Section Mixins
   */
  mixins: [currentTime],

  /*
   * Computed Properties
   */
  computed: mapState('blocks', [
    'block',
    'height'
  ]),

  /*
   * When mounted get the latest height
   */
  mounted: function () {
    return this.$store.dispatch('blocks/height')
  },

  activated: function () {
    return this.$store.dispatch('blocks/height')
  },

  /*
   * Watch methods
   */
  watch: {
    height: function () {
      return this
      .$store
      .dispatch('blocks/getBlockFromHeight', this.$store.blocks.height)
    }
  }
}
</script>
<style src='./latestBlock.scss' lang='scss' />
