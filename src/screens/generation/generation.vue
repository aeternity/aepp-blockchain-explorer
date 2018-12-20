<template>
  <article class="generation-screen screen">
    <section class="generation-main">
      <header class="generation-header">
        <section class="generation-header__section">
          <h1 class="title title-main">
            Key Block:
          </h1>
          <div class="basic-gen-info grid">
            <Field
              name="Block Height"
              class="field__height"
            >
              <div
                v-if="!isLoading"
                class="number"
              >
                {{ generation.keyBlock.height }}
              </div>
              <FillDummy
                v-else
                size="small"
              />
            </Field>
            <Field
              name="Block Confirmation"
              class="field__confirmation"
            >
              <div
                v-if="!isLoading"
                class="number"
              >
                {{ height - generation.keyBlock.height }}
              </div>
            </Field>
            <Field
              name="Key Block Hash"
              class="field__hash"
            >
              <RouterLink
                v-if="!isLoading"
                :to="`/block/${generation.keyBlock.hash}`"
              >
                <AeHash
                  :hash="generation.keyBlock.hash"
                  type="short"
                />
              </RouterLink>
              <ViewAndCopy
                v-if="!isLoading"
                color="boring"
                :text="generation.keyBlock.hash"
              />
              <FillDummy v-else />
            </Field>
          </div>
          <div class="basic-gen-info grid">
            <Field
              name="Transactions"
              class="field__transactions"
            >
              <div
                v-if="!isLoading"
                class="number"
              >
                {{ generation.numTransactions }}
              </div>
              <FillDummy
                v-else
                size="small"
              />
            </Field>
            <Field
              name="Micro Blocks"
              class="field__micro"
            >
              <div
                v-if="!isLoading"
                class="number"
              >
                {{ generation.microBlocksDetailed.length }}
              </div>
              <FillDummy
                v-else
                size="small"
              />
            </Field>
            <Field
              name="beneficiary"
              class="field__beneficiary"
            >
              <RouterLink
                v-if="!isLoading"
                :to="`/account/${generation.keyBlock.beneficiary}`"
                class="account-address"
              >
                <AeHash
                  :hash="generation.keyBlock.beneficiary"
                  type="short"
                />
              </RouterLink>
              <ViewAndCopy
                v-if="!isLoading"
                color="dramatic"
                :text="generation.keyBlock.beneficiary"
              />
              <FillDummy v-else />
            </Field>
          </div>
          <div class="basic-gen-info grid">
            <Field
              name="Target"
              class="field__target"
            >
              <div
                v-if="!isLoading"
                class="field-value number"
              >
                {{ generation.keyBlock.target }}
              </div>
              <FillDummy
                v-else
                size="big"
              />
            </Field>
            <Field
              name="Time Stamp"
              class="field__stamp"
            >
              <time
                v-if="!isLoading"
                :timedate="generation.keyBlock.time | humanDate"
                class="field-value number"
              >
                {{ generation.keyBlock.time | humanDate }}
              </time>
              <FillDummy
                v-else
                size="big"
              />
            </Field>
            <Field
              name="Age"
              class="field__age"
            >
              <RelativeTime
                v-if="!isLoading"
                :ts="currentTime - generation.keyBlock.time"
                spaced
              />
              <FillDummy v-else />
            </Field>
          </div>
          <nav class="gen-navigation grid">
            <AeButtonGroup>
              <RouterLink
                v-if="!isLoading"
                :to="`/generation/${(generation.keyBlock.height - 1)}`"
              >
                <AeButton
                  face="round"
                  fill="primary"
                >
                  previous
                </AeButton>
              </RouterLink>
              <FillDummy v-else />
              <RouterLink
                v-if="!isLoading"
                :to="`/generation/${(generation.keyBlock.height + 1)}`"
              >
                <AeButton
                  face="round"
                  fill="primary"
                >
                  next
                </AeButton>
              </RouterLink>
              <FillDummy v-else />
            </AeButtonGroup>
          </nav>
        </section>
      </header>

      <section class="block-micro-detailed">
        <template v-if="!isLoading">
          <article
            v-for="(m, index) in generation.microBlocksDetailed"
            :key="m.hash"
            class="micro-blocks-wrapper"
          >
            <section class="micro-block">
              <div class="grid micro-block__header">
                <h4 class="title title-main field__number">
                  <span class="number">
                    Micro Block No. {{ index+1 }}
                  </span>
                </h4>
                <Field
                  name="micro block hash"
                  class="field__hash"
                >
                  <RouterLink :to="`/block/${m.hash}`">
                    <AeHash
                      :hash="m.hash"
                      type="short"
                    />
                  </RouterLink>
                  <ViewAndCopy :text="m.hash" />
                </Field>
              </div>
              <div class="grid micro-block__header">
                <Field
                  v-if=" m.transactions.length !== 1"
                  name="Transactions"
                  class="field__number"
                >
                  <div
                    v-if="!isLoading"
                    class="number"
                  >
                    {{ m.transactions.length }}
                  </div>
                  <FillDummy
                    v-else
                    size="small"
                  />
                </Field>
                <Field
                  v-else
                  name="Transaction"
                  class="field__number"
                >
                  <div
                    v-if="!isLoading"
                    class="number"
                  >
                    {{ m.transactions.length }}
                  </div>
                  <FillDummy
                    v-else
                    size="small"
                  />
                </Field>
                <Field
                  v-cloak
                  name="time"
                  class="field__time"
                >
                  <time
                    :timedate="m.time | humanDate"
                    class="field-value number"
                  >
                    {{ m.time | humanDate }}
                  </time>
                </Field>
                <Field
                  v-cloak
                  name="time since mined"
                  class="field__mined"
                >
                  <RelativeTime
                    :ts="currentTime - m.time"
                    spaced
                  />
                </Field>
              </div>

              <article class="block-transactions">
                <div class="transactions">
                  <Transaction
                    v-for="t in m.transactions"
                    :key="t.hash"
                    :transaction="t"
                  />
                </div>
              </article>
            </section>
          </article>
        </template>
      </section>
    </section>
    <BackToTop class="backToTop" />
  </article>
</template>

<script>
import { mapState } from 'vuex'
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import Transaction from '../../components/transaction/transaction'
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy.vue'
import FillDummy from '../../components/fillDummy'
import BackToTop from '../../components/backToTop'
import {
  AeButtonGroup,
  AeButton
} from '@aeternity/aepp-components-3'

const blockHashRegex = RegExp('^[km]h_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  name: 'Generation',
  components: {
    RelativeTime,
    Transaction,
    Field,
    AeHash,
    ViewAndCopy,
    FillDummy,
    BackToTop,
    AeButtonGroup,
    AeButton
  },
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
  async mounted () {
    this.getGeneration()
    await this.$store.dispatch('blocks/height')
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
      console.log('gen', this.generation)
    }
  }
}
</script>
<style scoped src='../generation/generation.scss' lang='scss' />
