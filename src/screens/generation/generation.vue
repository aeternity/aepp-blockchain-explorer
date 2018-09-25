<template>
  <div  v-if="generation.keyBlock" class="generation-screen screen">
    <h3 class="title-left">
      Generation:
    </h3>
    <div class="generation-header">
      <div class="basic-gen-info grid">
        <div>
          <div class="field-name">Height</div>
          <div class="number">{{ generation.keyBlock.height }}</div>
        </div>
        <div>
          <div class="field-name">Micro Blocks</div>
          <div class="number">{{ generation.micros.length }}</div>
        </div>
        <div>
          <div class="field-name">Transactions</div>
          <div class="number">{{ generation.transactionNumber }}</div>
        </div>
      </div>
      <div class="gen-navigation grid">
        <router-link :to="`/generation/${(generation.keyBlock.height - 1)}`">
          prev: {{ generation.keyBlock.height - 1 }}
        </router-link>
        <router-link :to="`/generation/${(generation.keyBlock.height + 1)}`" v-if="generation.keyBlock.height">
          next: {{ generation.keyBlock.height + 1 }}
        </router-link>
      </div>
    </div>
    <h3 class="title-left">
      Key Block:
    </h3>
    <div class="generation-header">
      <div class="basic-gen-info grid">
        <div>
          <div class="field-name">mined by</div>
          <div class="account-address">
            <router-link :to="`/account/${generation.keyBlock.miner}`">
              {{ generation.keyBlock.miner | startAndEnd }}
            </router-link>
          </div>
        </div>
        <div>
          <div class="field-name">time since mined</div>
          <relative-time :ts="currentTime - generation.keyBlock.time" spaced />
        </div>
      </div>
      <div class="detail-block-info">
        <div class="field hash">
          <div class="field-name">Hash</div>
          <div class="block-hash">
            <router-link :to="`/block/${generation.keyBlock.hash}`">
              {{ generation.keyBlock.hash }}
            </router-link>
          </div>
        </div>
        <div class="grid">
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
          <div class="field hash">
            <div class="field-name">Parent Hash</div>
            <div class="field-value block-hash">
              <router-link :to="`/block/${generation.keyBlock.prevHash}`">
                {{ generation.keyBlock.prevHash | startAndEnd }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="block-micros">
      <h2 class="title">
        <span class="number">{{ generation.micros.length }}</span>
        <span v-if="generation.micros.length < 1">
          Micro Blocks
        </span>
        <span v-else>
          Micro Block
        </span>
      </h2>
      <div :key="m.hash" v-for="(m, index) in generation.micros">
        <h4>
          <span class="number">
            Micro Block No. {{index+1}}
          </span>
        </h4>
        <div class="micro-block">
          <div class="grid">
            <div class="field hash">
              <div class="field-name">Hash</div>
              <div class="block-hash">
                <router-link :to="`/block/${m.hash}`">
                  {{ m.hash }}
                </router-link>
              </div>
            </div>
            <div class="field" >
              <div class="field-name">Time since mined</div>
              <relative-time :ts="currentTime - m.time" spaced />
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AePanel } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import Transaction from '../../components/transaction/transaction'

const blockHashRegex = RegExp('^bh\\$[1-9A-HJ-NP-Za-km-z]{48,49}')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  /*
   * Component Name
   */
  name: 'Generation',

  /*
   * Props
   */
  props: [
    'generationId'
  ],

  /*
   * Intenal Components
   */
  components: { AePanel, RelativeTime, Transaction },

  /*
   * Mixins
   */
  mixins: [currentTime],

  /*
   * Computed Properties
   */
  computed: mapState('blocks', [
    'height',
    'generation'
  ]),

  /*
   * Component Methods
   */
  methods: {
    getGeneration () {
      if (blockHeightRegex.test(this.generationId)) {
        this.$store.dispatch('blocks/getGenerationFromHeight', Number(this.generationId))
      } else if (blockHashRegex.test(this.generationId)) {
        this.$store.dispatch('blocks/getGenerationFromHash', this.generationId)
      }
    }
  },

  /*
   * Watch Methods
   */
  watch: {
    generationId () {
      this.getGeneration()
    }
  },

  /*
   * Mounted lifecycle
   */
  mounted () {
    this.getGeneration()
  }
}
</script>
<style scoped src='../generation/generation.scss' lang='scss' />
