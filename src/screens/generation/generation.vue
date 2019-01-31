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
              <FillDummy
                v-else
                size="small"
              />
            </Field>
            <Field
              name="Key Block Hash"
              class="field__hash"
            >
              <template
                v-if="!isLoading"
              >
                <AeHash
                  :hash="generation.keyBlock.hash"
                  :type="hashSize"
                />
                <ViewAndCopy
                  v-if="!isLoading"
                  color="boring"
                  :text="generation.keyBlock.hash"
                />
              </template>
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
                {{ generation.microBlocks.length }}
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
                  :type="hashSize"
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
                  type="dramatic"
                  :disabled="generation.keyBlock.height === 0"
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
                  type="dramatic"
                  :disabled="generation.keyBlock.height === height"
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
        <template
          v-if="!isLoading"
          class="micro-blocks-wrapper"
        >
          <MicroBlock
            v-for="(m, index) in microBlocks[generationHeight]"
            :key="m.hash"
            :micro-block="m"
            :micro-block-number="index"
          />
        </template>
      </section>
      <div
        v-if="microBlocks[generationHeight] && needMore"
        class="center"
      >
        <AeButton
          v-if="!isLoadingMore"
          size="small"
          type="dramatic"
          @click="loadMore"
        >
          more blocks
        </AeButton>
      </div>
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
import {
  AeButtonGroup
} from '@aeternity/aepp-components-3'
import { AeButton } from '@aeternity/aepp-components'

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
    MicroBlock,
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
      isLoading: true,
      totalBlocks: 0,
      currentBlocks: 0,
      isLoadingMore: false,
      hashSize: 'short'
    }
  },
  computed: {
    ...mapState('blocks', [
      'height',
      'generations',
      'microBlocks',
      'hashToHeight'
    ]),
    generation () {
      return this.generations[this.generationHeight]
    },
    needMore () {
      return this.totalBlocks - this.currentBlocks > 0
    },
    generationHeight () {
      if (RegExp('^[0-9]+$').test(this.generationId)) {
        return this.generationId
      } else {
        return this.hashToHeight[this.generationId]
      }
    }
  },
  watch: {
    generationId () {
      this.getGenerationWithTransactions()
    }
  },
  async mounted () {
    this.checkHashSize()
    window.addEventListener('resize', this.checkHashSize)
    await this.$store.dispatch('blocks/height')
    await this.getGenerationWithTransactions()
  },
  methods: {
    async getGenerationWithTransactions () {
      await this.getGeneration()
      this.totalBlocks = this.generation.microBlocks.length
      this.currentBlocks = Math.min(this.totalBlocks, 10)
      this.isLoadingMore = true
      await this.$store.dispatch('blocks/getMicroBlocksByHeight', { 'height': Number(this.generationHeight), 'numBlocks': this.currentBlocks })
      this.isLoadingMore = false
    },
    async getGeneration () {
      this.isLoading = true
      if (blockHeightRegex.test(this.generationId)) {
        await this.$store.dispatch('blocks/getGenerationFromHeight', Number(this.generationId))
      } else if (blockHashRegex.test(this.generationId)) {
        await this.$store.dispatch('blocks/getGenerationFromHash', this.generationId)
      }
      this.isLoading = false
    },
    async loadMore () {
      this.isLoadingMore = true
      const toAdd = Math.max(Math.min(this.totalBlocks - this.currentBlocks, 10), 0)
      this.currentBlocks += toAdd
      this.getGeneration()
      await this.$store.dispatch('blocks/getMicroBlocksByHeight', { 'height': Number(this.generationHeight), 'numBlocks': this.currentBlocks })
      this.isLoadingMore = false
    },
    checkHashSize () {
      this.hashSize = 'short'
      if (window.matchMedia('(min-device-width: 768px)').matches) {
        this.hashSize = 'chunked'
      }
    }
  }
}
</script>
<style scoped src='../generation/generation.scss' lang='scss' />
