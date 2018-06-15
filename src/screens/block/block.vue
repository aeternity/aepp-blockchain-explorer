<template>
  <div  v-if="block.hash" class="block-screen screen">
    <div class="block-header">
      <div class="basic-block-info grid">
        <div>
          <span>Block</span>
          <span class="number block-height">{{ block.height }}</span>
        </div>
        <div>
          <span class="field-name">mined by</span>
          <span class="account-address">
            <router-link :to="`/account/${block.miner}`">
              {{ block.miner | startAndEnd }}
            </router-link>
          </span>
        </div>
        <div>
          <span class="field-name">time since mined</span>
          <relative-time :ts="currentTime - block.time" big spaced />
        </div>
      </div>
      <div class="detail-block-info">
        <div class="field hash">
          <div class="field-name">Hash</div>
          <div class="scroll">
            <div class="number">{{ block.hash }}</div>
          </div>
        </div>
        <div class="grid">
          <div class="field height">
            <div class="field-name">Height</div>
            <div class="field-value number">{{ block.height }}</div>
          </div>
          <div class="field rewarded">
            <div class="field-name">Target</div>
            <div class="field-value number">
              {{ block.target }}
            </div>
          </div>
          <div class="field time">
            <div class="field-name">
              Time (<span class="number">{{ block.time }}</span>)
            </div>
            <div class="field-value number">
              {{ block.time | humanDate }}
            </div>
          </div>
        </div>
        <div class="field hash">
          <div class="field-name">Parent Hash</div>
          <div class="field-value block-hash">
            <router-link :to="`/block/${block.prev_hash}`">
              {{ block.prev_hash | startAndEnd }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="block-navigation grid">
        <router-link :to="`/block/${(block.height - 1)}`">
          prev: {{ block.height - 1 }}
        </router-link>
        <router-link :to="`/block/${(block.height + 1)}`" v-if="block.height > height">
          next: {{ block.height + 1 }}
        </router-link>
      </div>
    </div>
    <div class="block-transactions">
      <h2 class="title">
        <span class="number">{{ block.transactions.length }}</span> Transaction(s)
      </h2>
      <div class="transactions">
        <transaction :key="t.hash" v-for="t in block.transactions" :transaction="t"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AePanel } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'

const blockHashRegex = RegExp('^bh\\$[1-9A-HJ-NP-Za-km-z]{48,49}')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  /*
   * Component Name
   */
  name: 'Block',

  /*
   * Props
   */
  props: [
    'blockId'
  ],

  /*
   * Intenal Components
   */
  components: { AePanel },

  /*
   * Mixins
   */
  mixins: [currentTime],

  /*
   * Computed Properties
   */
  computed: mapState('blocks', [
    'height',
    'block'
  ]),

  /*
   * Component Methods
   */
  methods: {
    getBlock () {
      if (blockHeightRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getBlockFromHeight', Number(this.blockId))
      } else if (blockHashRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getBlockFromHash', this.blockId)
      }
    }
  },

  /*
   * Watch Methods
   */
  watch: {
    blockId () {
      this.getBlock()
    }
  },

  /*
   * Mounted lifecycle
   */
  mounted () {
    this.getBlock()
  }
}
</script>
<style scoped src='./block.scss' lang='scss' />
