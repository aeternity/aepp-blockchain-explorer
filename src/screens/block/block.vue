<template>
  <div class="block-screen screen">
    <div>
      <div class="block-header">
        <div class="basic-block-info grid">
          <div class="center">
            <span class="field-name">Block: </span>
            <span class="number" v-if="block.height">{{ block.height }}</span>
            <fill-dummy v-else/>
          </div>
          <div v-if="block.miner">
            <span class="field-name">mined by</span>
            <span class="account-address">
              <router-link :to="`/account/${block.miner}`">
                {{ block.miner | startAndEnd }}
              </router-link>
            </span>
          </div>
          <div class="center">
            <span class="field-name">time since mined: </span>
            <relative-time :ts="currentTime - block.time" number spaced v-if="block.height" />
            <fill-dummy v-else/>
          </div>
        </div>
        <div class="detail-block-info">
          <div class="field hash">
            <div class="field-name">Hash</div>
            <div class="scroll">
              <div class="number" v-if="block.height">{{ block.hash }}</div>
              <fill-dummy color="grey" size="big" v-else/>
            </div>

          </div>
          <div class="grid">
            <div class="field height">
              <div class="field-name">Height</div>
              <div class="field-value number" v-if="block.height">{{ block.height }}</div>
              <fill-dummy v-else/>
            </div>
            <div class="field rewarded" v-if="block.target">
              <div class="field-name">Target</div>
              <div class="field-value number">
                {{ block.target }}
              </div>
            </div>
            <div class="field time">
              <div class="field-name">
                Time (<span class="number">{{ block.time }}</span>)
              </div>
              <div class="field-value number" v-if="block.height">
                {{ block.time | humanDate }}
              </div>
              <fill-dummy v-else/>
            </div>
          </div>
          <div class="field hash">
            <div class="field-name">Parent Hash</div>
            <div class="field-value block-hash" v-if="block.height">
              <router-link :to="`/block/${block.prevHash}`">
                {{ block.prevHash | startAndEnd }}
              </router-link>
            </div>
            <fill-dummy v-else/>
          </div>
        </div>
        <div class="block-navigation grid" v-if="block.height">
          <router-link :to="`/block/${(block.height - 1)}`">
            prev: {{ block.height - 1 }}
          </router-link>
          <router-link :to="`/block/${(block.height + 1)}`" v-if="block.height">
            next: {{ block.height + 1 }}
          </router-link>
        </div>
      </div>
      <div class="block-transactions" v-if="!isKeyBlock">
        <h2 class="title" v-if="block.height">
          <span class="number">{{ block.transactions.length }}</span> Transaction(s)
        </h2>
        <div v-else>
          <div><fill-dummy color="grey"/></div>
          <div><fill-dummy color="grey" size="big"/></div>
          <div><fill-dummy color="grey" size="big"/></div>
          <div><fill-dummy color="grey" size="big"/></div>
        </div>
        <div class="transactions" v-if="block.height">
          <transaction :key="t.hash" v-for="t in block.transactions" :transaction="t"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AePanel } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import Transaction from '../../components/transaction/transaction'
import FillDummy from '../../components/fillDummy'

const blockHashRegex = RegExp('^[km]h_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  name: 'Block',
  props: [
    'blockId'
  ],
  components: { AePanel, RelativeTime, Transaction, FillDummy },
  mixins: [currentTime],
  computed: {
    ...mapState('blocks', ['block', 'height']),
    isKeyBlock () {
      return this.blockId.startsWith('kh')
    }
  },
  methods: {
    getBlock () {
      this.$store.commit('blocks/setBlock', {})
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
