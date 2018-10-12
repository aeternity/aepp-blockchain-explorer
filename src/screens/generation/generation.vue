<template>
  <article  class="generation-screen screen">
    <section v-if="!isLoading">
      <header class="generation-header">
        <h1 class="title title-main">
          Generation:
        </h1>
        <section class="generation-header__section">
          <div class="basic-gen-info grid">
            <field name="Height">
              <div class="number">{{ generation.keyBlock.height }}</div>
            </field>
            <field name="Micro Blocks">
              <div class="number">{{ generation.micros.length }}</div>
            </field>
            <field name="Transactions">
              <div class="number">{{ generation.transactions.length }}</div>
            </field>
          </div>
          <nav class="gen-navigation grid">
            <router-link :to="`/generation/${(generation.keyBlock.height - 1)}`">
              prev: {{ generation.keyBlock.height - 1 }}
            </router-link>
            <router-link :to="`/generation/${(generation.keyBlock.height + 1)}`" v-if="generation.keyBlock.height">
              next: {{ generation.keyBlock.height + 1 }}
            </router-link>
          </nav>
        </section>
        <h2 class="title title-main">
          Key Block:
        </h2>
        <section class="generation-header__section">
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
        </section>
      </header>

      <section class="block-micros">
        <h2 class="title">
          <span class="number">{{ generation.micros.length  }}</span>
          Micro Block{{ generation.micros.length !== 1 ? 's' : '' }}
        </h2>
        <article class="micro-blocks-wrapper" :key="m.hash" v-for="(m, index) in generation.micros">
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
                  <span class="number">{{ generation.transactions[index].transactions.length }}</span> Transaction{{ generation.transactions[index].transactions.length !== 1 ? 's' : '' }}
                </h2>
              </header>
              <div class="transactions">
                <transaction :key="t.hash" v-for="t in generation.transactions[index].transactions" :transaction="t"/>
              </div>
            </article>

          </section>
        </article>

      </section>
    </section>

    <loader v-else/>

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

const blockHashRegex = RegExp('^bh\\$[1-9A-HJ-NP-Za-km-z]{48,49}')
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
