<template>
  <article class="generation-screen screen">
    <section>
      <header class="generation-header">
        <h1 class="title title-main">
          Generation:
        </h1>
        <section class="generation-header__section">
          <div class="basic-gen-info grid">
            <Field name="Height">
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
            <Field name="Micro Blocks">
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
            <Field name="Transactions">
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
          </div>
          <nav class="gen-navigation grid">
            <RouterLink
              v-if="!isLoading"
              :to="`/generation/${(generation.keyBlock.height - 1)}`"
            >
              prev: {{ generation.keyBlock.height - 1 }}
            </RouterLink>
            <FillDummy v-else />
            <RouterLink
              v-if="!isLoading"
              :to="`/generation/${(generation.keyBlock.height + 1)}`"
            >
              next: {{ generation.keyBlock.height + 1 }}
            </RouterLink>
            <FillDummy v-else />
          </nav>
        </section>
        <h2 class="title title-main">
          Key Block:
        </h2>
        <section class="generation-header__section">
          <div class="basic-gen-info grid">
            <Field name="beneficiary">
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
            <Field name="time since mined">
              <RelativeTime
                v-if="!isLoading"
                :ts="currentTime - generation.keyBlock.time"
                spaced
              />
              <FillDummy v-else />
            </Field>
          </div>
          <div class="detail-block-info">
            <Field
              name="Hash"
              class="hash"
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
                color="dramatic"
                :text="generation.keyBlock.hash"
              />
              <FillDummy v-else />
            </Field>
            <div class="grid">
              <Field
                name="target"
                class="rewarded"
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
                name="time"
                class="time"
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
                name="parent hash"
                class="hash"
              >
                <div class="field-value block-hash">
                  <RouterLink
                    v-if="!isLoading"
                    :to="`/block/${generation.keyBlock.prevHash}`"
                  >
                    <AeHash
                      :hash="generation.keyBlock.prevHash"
                      type="short"
                    />
                  </RouterLink>
                  <ViewAndCopy
                    v-if="!isLoading"
                    color="dramatic"
                    :text="generation.keyBlock.prevHash"
                  />
                  <FillDummy
                    v-else
                    size="big"
                  />
                </div>
              </Field>
            </div>
          </div>
        </section>
      </header>

      <section class="block-micro-detailed">
        <h2
          v-if="!isLoading"
          class="title"
        >
          <span class="number">
            {{ generation.microBlocksDetailed.length }}
          </span>
          Micro Block{{ generation.microBlocksDetailed.length !== 1 ? 's' : '' }}
        </h2>
        <div v-else>
          <div><FillDummy color="grey" /></div>
          <div>
            <FillDummy
              color="grey"
              size="big"
            />
          </div>
          <div>
            <FillDummy
              color="grey"
              size="big"
            />
          </div>
          <div>
            <FillDummy
              color="grey"
              size="big"
            />
          </div>
        </div>
        <template v-if="!isLoading">
          <article
            v-for="(m, index) in generation.microBlocksDetailed"
            :key="m.hash"
            class="micro-blocks-wrapper"
          >
            <h4>
              <span class="number">
                Micro Block No. {{ index+1 }}
              </span>
            </h4>
            <section class="micro-block">
              <div class="grid">
                <Field
                  name="hash"
                  class="hash"
                >
                  <RouterLink :to="`/block/${m.hash}`">
                    <AeHash
                      :hash="m.hash"
                      type="short"
                    />
                  </RouterLink>
                  <ViewAndCopy :text="m.hash" />
                </Field>
                <Field
                  v-cloak
                  name="time since mined"
                >
                  <RelativeTime
                    :ts="currentTime - m.time"
                    spaced
                  />
                </Field>
              </div>
              <div class="grid">
                <Field
                  v-cloak
                  name="time"
                  class="time"
                >
                  <time
                    :timedate="m.time | humanDate"
                    class="field-value number"
                  >
                    {{ m.time | humanDate }}
                  </time>
                </Field>
                <Field
                  name="parent hash"
                  class="hash"
                >
                  <RouterLink :to="`/block/${m.prevHash}`">
                    <AeHash
                      :hash="m.prevHash"
                      type="short"
                    />
                  </RouterLink>
                  <ViewAndCopy :text="m.prevHash" />
                </Field>
              </div>

              <article class="block-transactions">
                <header class="block-transactions__header">
                  <h2 class="title title-sub">
                    <span class="number">
                      {{ m.transactions.length }}
                    </span> Transaction{{ m.transactions.length !== 1 ? 's' : '' }}
                  </h2>
                </header>
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
    BackToTop
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
