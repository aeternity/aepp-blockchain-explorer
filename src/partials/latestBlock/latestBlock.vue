<template>
  <div class="latest-block-partial" v-else>
    <div class="grid">
      <div class="explanation">
        <h2 class="title">Latest Block</h2>
        <ae-button type="exciting" size="small" :to="`/block/${height}`">view last</ae-button>
        <ae-button type="exciting" size="small" to="/blocks">view all</ae-button>
      </div>
      <div class="block-data">
        <div class="grid block-basic-info">
          <div class="number chain-height">
            <img src="@/assets/block.svg"/>
            <router-link :to="`/block/${height}`">{{ height }}</router-link>
          </div>
          <div class="ago">
            <span>mined</span>
              <relative-time :ts="currentTime - block.time" big />
            <span>ago</span>
          </div>
        </div>
        <div class="grid block-extended-info">
          <div class="field">
            <div class="field-name">Hash</div>
            <div class="field-value block-hash">
              <router-link :to="`/block/${block.hash}`" v-if="block.hash">
                <ae-hash type='short' :hash="block.hash"/>
              </router-link>
            </div>
          </div>
          <div class="field">
            <div class="field-name">Transactions</div>
            <div class="field-value number" v-if="block.transactions">{{ block.transactions.length }}</div>
          </div>
          <div class="field">
            <div class="field-name">Mined by</div>
            <div class="field-value account-address">
              <router-link :to="`/account/${block.minedBy}`">
                <named-address :address="block.minedBy" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AeButton } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'

export default {
  /*
   * Section Components
   */
  components: { AeButton },

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
   * mounted get the latest height of the
   * blockchain, then get block data
   */
  mounted: function () {
    return this
    .$store
    .dispatch('blocks/height')
    .then((blockHeight) => this
    .$store
    .dispatch('blocks/getBlockFromHeight', blockHeight))
  }
}
</script>
<style src='./latestBlock.scss' lang='scss' />
