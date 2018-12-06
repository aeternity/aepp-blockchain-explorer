<template>
  <article class="generation-screen screen">
    <section>
      <header class="generation-header">
        <h1 class="title title-main">
          Generation:
        </h1>
        <section class="generation-header__section">
          <div class="basic-gen-info grid">
            <field name="Height">
              <div
                v-if="!isLoading"
                class="number">
                {{ generation.keyBlock.height }}
              </div>
              <fill-dummy
                v-else
                size="small"/>
            </field>
            <field name="Micro Blocks">
              <div
                v-if="!isLoading"
                class="number">
                {{ generation.microBlocksDetailed.length }}
              </div>
              <fill-dummy
                v-else
                size="small"/>
            </field>
            <field name="Transactions">
              <div
                v-if="!isLoading"
                class="number">
                {{ generation.numTransactions }}
              </div>
              <fill-dummy
                v-else
                size="small"/>
            </field>
          </div>
          <nav class="gen-navigation grid">
            <router-link
              v-if="!isLoading"
              :to="`/generation/${(generation.keyBlock.height - 1)}`">
              prev: {{ generation.keyBlock.height - 1 }}
            </router-link>
            <fill-dummy v-else/>
            <router-link
              v-if="!isLoading"
              :to="`/generation/${(generation.keyBlock.height + 1)}`">
              next: {{ generation.keyBlock.height + 1 }}
            </router-link>
            <fill-dummy v-else/>
          </nav>
        </section>
        <h2 class="title title-main">
          Key Block:
        </h2>
        <section class="generation-header__section">
          <div class="basic-gen-info grid">
            <field name="beneficiary">
              <router-link
                v-if="!isLoading"
                :to="`/account/${generation.keyBlock.beneficiary}`"
                class="account-address">
                <ae-hash
                  :hash="generation.keyBlock.beneficiary"
                  type="short"/>
              </router-link>
              <view-and-copy
                v-if="!isLoading"
                :text="generation.keyBlock.beneficiary"/>
              <fill-dummy v-else/>
            </field>
            <field name="time since mined">
              <relative-time
                v-if="!isLoading"
                :ts="currentTime - generation.keyBlock.time"
                spaced />
              <fill-dummy v-else/>
            </field>
          </div>
          <div class="detail-block-info">
            <field
              name="Hash"
              class="hash">
              <router-link
                v-if="!isLoading"
                :to="`/block/${generation.keyBlock.hash}`">
                <ae-hash
                  :hash="generation.keyBlock.hash"
                  type="short"/>
              </router-link>
              <view-and-copy
                v-if="!isLoading"
                :text="generation.keyBlock.hash"/>
              <fill-dummy v-else/>
            </field>
            <div class="grid">
              <field
                name="target"
                class="rewarded">
                <div
                  v-if="!isLoading"
                  class="field-value number">
                  {{ generation.keyBlock.target }}
                </div>
                <fill-dummy
                  v-else
                  size="big"/>
              </field>
              <field
                name="time"
                class="time">
                <time
                  v-if="!isLoading"
                  :timedate="generation.keyBlock.time | humanDate"
                  class="field-value number">
                  {{ generation.keyBlock.time | humanDate }}
                </time>
                <fill-dummy
                  v-else
                  size="big"/>
              </field>
              <field
                name="parent hash"
                class="hash">
                <div class="field-value block-hash">
                  <router-link
                    v-if="!isLoading"
                    :to="`/block/${generation.keyBlock.prevHash}`">
                    <ae-hash
                      :hash="generation.keyBlock.prevHash"
                      type="short"/>
                  </router-link>
                  <view-and-copy
                    v-if="!isLoading"
                    :text="generation.keyBlock.prevHash"/>
                  <fill-dummy
                    v-else
                    size="big"/>
                </div>
              </field>
            </div>
          </div>
        </section>
      </header>

      <section class="block-micro-detailed">
        <h2
          v-if="!isLoading"
          class="title">
          <span class="number">{{ generation.microBlocksDetailed.length }}</span>
          Micro Block{{ generation.microBlocksDetailed.length !== 1 ? 's' : '' }}
        </h2>
        <div v-else>
          <div><fill-dummy color="grey"/></div>
          <div><fill-dummy
            color="grey"
            size="big"/></div>
          <div><fill-dummy
            color="grey"
            size="big"/></div>
          <div><fill-dummy
            color="grey"
            size="big"/></div>
        </div>
        <template v-if="!isLoading">
          <article
            v-for="(m, index) in generation.microBlocksDetailed"
            :key="m.hash"
            class="micro-blocks-wrapper">
            <h4>
              <span class="number">
                Micro Block No. {{ index+1 }}
              </span>
            </h4>
            <section class="micro-block">
              <div class="grid">
                <field
                  name="hash"
                  class="hash">
                  <router-link :to="`/block/${m.hash}`">
                    <ae-hash
                      :hash="m.hash"
                      type="short"/>
                  </router-link>
                  <view-and-copy :text="m.hash"/>
                </field>
                <field
                  v-cloak
                  name="time since mined">
                  <relative-time
                    :ts="currentTime - m.time"
                    spaced />
                </field>
              </div>
              <div class="grid">
                <field
                  v-cloak
                  name="time"
                  class="time">
                  <time
                    :timedate="m.time | humanDate"
                    class="field-value number">
                    {{ m.time | humanDate }}
                  </time>
                </field>
                <field
                  name="parent hash"
                  class="hash">
                  <router-link :to="`/block/${m.prevHash}`">
                    <ae-hash
                      :hash="m.prevHash"
                      type="short"/>
                  </router-link>
                  <view-and-copy :text="m.prevHash"/>
                </field>
              </div>

              <article class="block-transactions">
                <header class="block-transactions__header">
                  <h2 class="title title-sub">
                    <span class="number">{{ m.transactions.length }}</span> Transaction{{ m.transactions.length !== 1 ? 's' : '' }}
                  </h2>
                </header>
                <div class="transactions">
                  <transaction
                    v-for="t in m.transactions"
                    :key="t.hash"
                    :transaction="t"/>
                </div>
              </article>

            </section>
          </article>
        </template>

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
import FillDummy from '../../components/fillDummy'

const blockHashRegex = RegExp('^[km]h_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  name: 'Generation',
  components: { AePanel, RelativeTime, Transaction, Field, AeHash, ViewAndCopy, Loader, FillDummy },
  mixins: [currentTime],
  props: {
    generationId: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      isLoading: true
    }
  },
  computed: mapState('blocks', [
    'height',
    'generation'
  ]),
  watch: {
    generationId () {
      this.getGeneration()
    }
  },
  mounted () {
    this.getGeneration()
  },
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
  }
}
</script>
<style scoped src='../generation/generation.scss' lang='scss' />
