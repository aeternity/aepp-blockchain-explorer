<template>
  <div class="block-screen screen">
    <div  v-if="block.height">
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
              <router-link :to="`/block/${block.prevHash}`">
                {{ block.prevHash | startAndEnd }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="block-navigation grid">
          <router-link :to="`/block/${(block.height - 1)}`">
            prev: {{ block.height - 1 }}
          </router-link>
          <router-link :to="`/block/${(block.height + 1)}`" v-if="block.height">
            next: {{ block.height + 1 }}
          </router-link>
        </div>
      </div>
      <div class="block-transactions" v-if="!isKeyBlock">
        <h2 class="title">
          <span class="number">{{ block.transactions.length }}</span> Transaction(s)
        </h2>
        <div class="transactions">
          <transaction :key="t.hash" v-for="t in block.transactions" :transaction="t"/>
        </div>
      </div>
    </div>
    <loader v-else/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AePanel } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import Transaction from '../../components/transaction/transaction'
import Loader from '../../components/loader'

const blockHashRegex = RegExp('^[km]h_[1-9A-HJ-NP-Za-km-z]{48,49}$')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  name: 'Block',
  props: [
    'blockId'
  ],
  components: { AePanel, RelativeTime, Transaction, Loader },
  mixins: [currentTime],
  computed: {
    ...mapState('blocks', ['block', 'height']),
    isKeyBlock () {
      return this.blockId.startsWith('kh')
    }
  },
  methods: {
    getBlock () {
      if (blockHeightRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getBlockFromHeight', Number(this.blockId))
      } else if (blockHashRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getBlockFromHash', this.blockId)
      }
    }
  },
  watch: {
    blockId () {
      this.getBlock()
    }
  },
  mounted () {
    this.getBlock()
  }
}
</script>
<style scoped src='./block.scss' lang='scss' />
