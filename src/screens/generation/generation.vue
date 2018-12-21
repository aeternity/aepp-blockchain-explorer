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
            <Field name="age">
              <RelativeTime
                v-if="!isLoading"
                :ts="currentTime - generation.keyBlock.time"
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
        <template v-if="!isLoading">
          <article
            v-for="(m, index) in generation.microBlocksDetailed"
            :key="m.hash"
            class="micro-blocks-wrapper"
          >
            <MicroBlock
              :micro-block="m"
              :micro-block-number="index"
            />
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
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import ViewAndCopy from '../../components/viewAndCopy.vue'
import FillDummy from '../../components/fillDummy'
import BackToTop from '../../components/backToTop'
import MicroBlock from '../../components/microBlock/microBlock'

const blockHashRegex = RegExp('^[km]h_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  name: 'Generation',
  components: {
    RelativeTime,
    Field,
    AeHash,
    ViewAndCopy,
    FillDummy,
    BackToTop,
    MicroBlock
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
