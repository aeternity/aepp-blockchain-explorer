<template>
  <div  v-if="generation.keyBlock" class="generation-screen screen">
    <h3 class="title-left">
      Generation:
    </h3>
    <div class="generation-header">
      <div class="basic-gen-info grid">
        <field name="Height">
            <div class="number">{{ generation.keyBlock.height }}</div>
        </field>
        <field name="Micro Blocks">
           <div class="number">{{ generation.micros.length }}</div>
        </field>
        <field name="Transactions">
            <div class="number">{{ generation.transactionNumber }}</div>
        </field>
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
        <field name="mined by">
          <router-link :to="`/account/${generation.keyBlock.miner}`" class="account-address">
             <ae-hash type="short" :hash="generation.keyBlock.miner"/>
          </router-link>
          <view-and-copy :text='generation.keyBlock.miner'/>
        </field>
        <field name="time since mined">
          <relative-time :ts="currentTime - generation.keyBlock.time" spaced />
        </field>
      </div>
      <div class="detail-block-info">
        <field name="Hash" class="hash">
            <router-link :to="`/block/${generation.keyBlock.hash}`">
              <ae-hash type="short" :hash="generation.keyBlock.hash"/>
            </router-link>
            <view-and-copy :text='generation.keyBlock.hash'/>
        </field>
        <div class="grid">
          <field name="target" class="rewarded">
            <div class="field-value number">
              {{ generation.keyBlock.target }}
            </div>
          </field>
          <field name="time" :content="generation.keyBlock.time" class="time">
            <time :timedate="generation.keyBlock.time | humanDate" class="field-value number">
              {{ generation.keyBlock.time | humanDate }}
            </time>
          </field>
          <field name="parent hash" class="hash">
            <div class="field-value block-hash">
              <router-link :to="`/block/${generation.keyBlock.prevHash}`">
                <ae-hash type="short" :hash="generation.keyBlock.prevHash"/>
              </router-link>
              <view-and-copy :text='generation.keyBlock.prevHash'/>
            </div>
          </field>
        </div>
      </div>
    </div>

    <div class="block-micros">
      <h2 class="title">
        <span class="number">{{ generation.micros.length }}</span> Micro Block(s)
      </h2>
      <div :key="m.hash" v-for="(m, index) in generation.micros">
        <h4>
          <span class="number">
            Micro Block No. {{index+1}}
          </span>
        </h4>
        <div class="micro-block">
          <div class="grid">
            <field name="hash" class="hash">
                <router-link :to="`/block/${m.hash}`">
                   <ae-hash type="short" :hash="m.hash"/>
                </router-link>
                <view-and-copy :text='m.hash'/>
            </field>
            <field name="time since mined">
              <relative-time :ts="currentTime - m.time" spaced />
            </field>
          </div>
          <div class="grid">
            <field name="time" class="time">
              <time :timedate="m.time | humanDate" class="field-value number">
                {{ m.time | humanDate }}
              </time>
            </field>
            <field name="parent hash" class="hash">
                <router-link :to="`/block/${m.prevHash}`">
                  <ae-hash type="short" :hash="m.prevHash"/>
                </router-link>
                <view-and-copy :text='m.prevHash'/>
            </field>
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
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy.vue'

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
  components: { AePanel, RelativeTime, Transaction, Field, AeHash, ViewAndCopy },

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
