<template>
  <div class="block-screen screen">
    <div  v-if="generation.keyBlock">
      <div class="block-header">
        <div class="basic-block-info grid">
          <div>
            <span>Block</span>
            <span class="number block-height">{{ generation.keyBlock.height }}</span>
          </div>
          <div>
            <span class="field-name">mined by</span>
            <span class="account-address">
              <router-link :to="`/account/${generation.keyBlock.miner}`">
                {{ generation.keyBlock.miner | startAndEnd }}
              </router-link>
            </span>
          </div>
          <div>
            <span class="field-name">time since mined</span>
            <relative-time :ts="currentTime - generation.keyBlock.time" big spaced />
          </div>
        </div>
        <div class="detail-block-info">
          <div class="field hash">
            <div class="field-name">Hash</div>
            <div class="scroll">
              <div class="number">{{ generation.keyBlock.hash }}</div>
            </div>
          </div>
          <div class="grid">
            <div class="field height">
              <div class="field-name">Height</div>
              <div class="field-value number">{{ generation.keyBlock.height }}</div>
            </div>
            <div class="field rewarded">
              <div class="field-name">Target</div>
              <div class="field-value number">
                {{ generation.keyBlock.target }}
              </div>
            </div>
            <div class="field time">
              <div class="field-name">
                Time (<span class="number">{{ generation.keyBlock.time }}</span>)
              </div>
              <div class="field-value number">
                {{ generation.keyBlock.time | humanDate }}
              </div>
            </div>
          </div>
          <div class="field hash">
            <div class="field-name">Parent Hash</div>
            <div class="field-value block-hash">
              <router-link :to="`/block/${generation.keyBlock.prevHash}`">
                {{ generation.keyBlock.prevHash | startAndEnd }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="block-navigation grid">
          <router-link :to="`/block/${(generation.keyBlock.height - 1)}`">
            prev: {{ generation.keyBlock.height - 1 }}
          </router-link>
          <router-link :to="`/block/${(generation.keyBlock.height + 1)}`" v-if="generation.keyBlock.height < height">
            next: {{ generation.keyBlock.height + 1 }}
          </router-link>
        </div>
      </div>

      <div class="block-micros">
        <h2 class="title">
          <span class="number">{{ generation.micros.length }}</span> Micro Block(s)
        </h2>
        <div :key="m.hash" v-for="m in generation.micros">
          <div>
            <span class="field-name">time since mined</span>
            <relative-time :ts="currentTime - m.time" big spaced />
          </div>
          <div class="field hash">
            <div class="field-name">Hash</div>
            <div class="scroll">
              <div class="number">{{ m.hash }}</div>
            </div>
          </div>
          <div class="grid">
            <div class="field time">
              <div class="field-name">
                Time (<span class="number">{{ m.time }}</span>)
              </div>
              <div class="field-value number">
                {{ m.time | humanDate }}
              </div>
            </div>
            <div class="field hash">
              <div class="field-name">Parent Hash</div>
              <div class="field-value block-hash">
                <router-link :to="`/block/${m.prevHash}`">
                  {{ m.prevHash | startAndEnd }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="block-transactions">
            <h2 class="title">
              <span class="number">{{ m.transactions.length }}</span> Transaction(s)
            </h2>
            <div class="transactions">
              <transaction :key="t.hash" v-for="t in m.transactions" :transaction="t"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <loader/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AePanel } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import Transaction from '../../components/transaction/transaction'
import Loader from '../../components/loader'

const blockHashRegex = RegExp('^bh\\$[1-9A-HJ-NP-Za-km-z]{48,49}')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  name: 'Block',
  props: [
    'blockId'
  ],
  components: { AePanel, RelativeTime, Transaction, Loader },
  mixins: [currentTime],
  computed: mapState('blocks', [
    'height',
    'generation'
  ]),
  methods: {
    getBlock () {
      if (blockHeightRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getGenerationFromHeight', Number(this.blockId))
      } else if (blockHashRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getGenerationFromHash', this.blockId)
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
