<template>
  <article  class="generation-screen screen">
    <section>
      <header class="generation-header">
        <h1 class="title title-main">
          Generation:
        </h1>
        <section class="generation-header__section">
          <div class="basic-gen-info grid">
            <field name="Height">
              <div v-if="!isLoading" class="number">
                {{ generation.keyBlock.height }}
              </div>
              <div class="fill-dummy-small" v-else> &nbsp; </div>
            </field>
            <field name="Micro Blocks">
              <div v-if="!isLoading" class="number">
                {{ generation.microBlocksDetailed.length }}
              </div>
              <div class="fill-dummy-small" v-else> &nbsp; </div>
            </field>
            <field name="Transactions">
              <div v-if="!isLoading" class="number">
                {{ generation.numTransactions }}
              </div>
              <div class="fill-dummy-small" v-else> &nbsp; </div>
            </field>
          </div>
          <nav class="gen-navigation grid">
            <router-link :to="`/generation/${(generation.keyBlock.height - 1)}`" v-if="!isLoading">
              prev: {{ generation.keyBlock.height - 1 }}
            </router-link>
            <div class="fill-dummy" v-else> &nbsp; </div>
            <router-link :to="`/generation/${(generation.keyBlock.height + 1)}`" v-if="!isLoading">
              next: {{ generation.keyBlock.height + 1 }}
            </router-link>
            <div class="fill-dummy" v-else> &nbsp; </div>
          </nav>
        </section>
        <h2 class="title title-main">
          Key Block:
        </h2>
        <section class="generation-header__section">
          <div class="basic-gen-info grid">
            <field name="mined by">
              <router-link :to="`/account/${generation.keyBlock.miner}`" class="account-address" v-if="!isLoading">
                <ae-hash type="short" :hash="generation.keyBlock.miner"/>
              </router-link>
              <view-and-copy :text='generation.keyBlock.miner' v-if="!isLoading"/>
              <div class="fill-dummy" v-else> &nbsp; </div>
            </field>
            <field name="time since mined">
              <relative-time :ts="currentTime - generation.keyBlock.time" spaced v-if="!isLoading" />
              <div class="fill-dummy" v-else> &nbsp; </div>
            </field>
          </div>
          <div class="detail-block-info">
            <field name="Hash" class="hash">
              <router-link :to="`/block/${generation.keyBlock.hash}`" v-if="!isLoading">
                <ae-hash type="short" :hash="generation.keyBlock.hash"/>
              </router-link>
              <view-and-copy :text='generation.keyBlock.hash' v-if="!isLoading"/>
              <div class="fill-dummy" v-else> &nbsp; </div>
            </field>
            <div class="grid">
              <field name="target" class="rewarded">
                <div class="field-value number" v-if="!isLoading">
                  {{ generation.keyBlock.target }}
                </div>
                <div class="fill-dummy-big" v-else> &nbsp; </div>
              </field>
              <field name="time" class="time">
                <time :timedate="generation.keyBlock.time | humanDate" class="field-value number" v-if="!isLoading">
                  {{ generation.keyBlock.time | humanDate }}
                </time>
                <div class="fill-dummy-big" v-else> &nbsp; </div>
              </field>
              <field name="parent hash" class="hash">
                <div class="field-value block-hash">
                  <router-link :to="`/block/${generation.keyBlock.prevHash}`" v-if="!isLoading">
                    <ae-hash type="short" :hash="generation.keyBlock.prevHash"/>
                  </router-link>
                  <view-and-copy :text='generation.keyBlock.prevHash' v-if="!isLoading"/>
                  <div class="fill-dummy-big" v-else> &nbsp; </div>
                </div>
              </field>
            </div>
          </div>
        </section>
      </header>

      <section class="block-micro-detailed">
        <h2 class="title" v-if="!isLoading">
          <span class="number">{{ generation.microBlocksDetailed.length  }}</span>
          Micro Block{{ generation.microBlocksDetailed.length !== 1 ? 's' : '' }}
        </h2>
        <div v-else>
          <div><span class="fill-dummy-grey">&nbsp;</span></div>
          <div><span class="fill-dummy-grey-big">&nbsp;</span></div>
          <div><span class="fill-dummy-grey-big">&nbsp;</span></div>
          <div><span class="fill-dummy-grey-big">&nbsp;</span></div>
        </div>
        <article class="micro-blocks-wrapper" :key="m.hash" v-for="(m, index) in generation.microBlocksDetailed" v-if="!isLoading">
          <h4>
            <span class="number">
              Micro Block No. {{index+1}}
            </span>
          </h4>
          <section class="micro-block">
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

            <article class="block-transactions">
              <header class="block-transactions__header">
                <h2 class="title title-sub">
                  <span class="number">{{ m.transactions.length }}</span> Transaction{{ m.transactions.length !== 1 ? 's' : '' }}
                </h2>
              </header>
              <div class="transactions">
                <transaction :key="t.hash" v-for="t in m.transactions" :transaction="t"/>
              </div>
            </article>

          </section>
        </article>

      </section>
    </section>
  </article>
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
import Loader from '../../components/loader'

const blockHashRegex = RegExp('^[km]h_[1-9A-HJ-NP-Za-km-z]{48,49}$')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  name: 'Generation',
  data: function () {
    return {
      isLoading: true
    }
  },
  props: [
    'generationId'
  ],
  components: { AePanel, RelativeTime, Transaction, Field, AeHash, ViewAndCopy, Loader },
  mixins: [currentTime],
  computed: mapState('blocks', [
    'height',
    'generation'
  ]),
  methods: {
    async getGeneration () {
      this.isLoading = true
      if (blockHeightRegex.test(this.generationId)) {
        await this.$store.dispatch('blocks/getGenerationFromHeight', Number(this.generationId))
      } else if (blockHashRegex.test(this.generationId)) {
        await this.$store.dispatch('blocks/getGenerationFromHash', this.generationId)
      }
      this.isLoading = false
    }
  },
  watch: {
    generationId () {
      this.getGeneration()
    }
  },
  mounted () {
    this.getGeneration()
  }
}
</script>
<style scoped src='../generation/generation.scss' lang='scss' />
