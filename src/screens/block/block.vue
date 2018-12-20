<template>
  <div class="block-screen screen">
    <div>
      <div class="block-header">
        <div class="basic-block-info grid">
          <div class="center">
            <span class="field-name">
              Block:
            </span>
            <span
              v-if="block.height"
              class="number"
            >
              {{ block.height }}
            </span>
            <FillDummy v-else />
          </div>
          <div v-if="block.beneficiary">
            <span class="field-name">
              beneficiary
            </span>
            <span class="account-address">
              <RouterLink :to="`/account/${block.beneficiary}`">
                {{ block.beneficiary | startAndEnd }}
              </RouterLink>
            </span>
          </div>
          <div class="center">
            <span class="field-name">
              age:
            </span>
            <RelativeTime
              v-if="block.height"
              :ts="currentTime - block.time"
              number
              spaced
            />
            <FillDummy v-else />
          </div>
        </div>
        <div class="detail-block-info">
          <div class="field hash">
            <div class="field-name">
              Hash
            </div>
            <div class="scroll">
              <div
                v-if="block.height"
                class="number"
              >
                {{ block.hash }}
              </div>
              <FillDummy
                v-else
                color="grey"
                size="big"
              />
            </div>
          </div>
          <div class="grid">
            <div class="field height">
              <div class="field-name">
                Height
              </div>
              <div
                v-if="block.height"
                class="field-value number"
              >
                {{ block.height }}
              </div>
              <FillDummy v-else />
            </div>
            <div
              v-if="block.target"
              class="field rewarded"
            >
              <div class="field-name">
                Target
              </div>
              <div class="field-value number">
                {{ block.target }}
              </div>
            </div>
            <div class="field time">
              <div class="field-name">
                Time (<span class="number">
                  {{ block.time }}
                </span>)
              </div>
              <div
                v-if="block.height"
                class="field-value number"
              >
                {{ block.time | humanDate }}
              </div>
              <FillDummy v-else />
            </div>
          </div>
          <div class="field hash">
            <div class="field-name">
              Parent Hash
            </div>
            <div
              v-if="block.height"
              class="field-value block-hash"
            >
              <RouterLink :to="`/block/${block.prevHash}`">
                {{ block.prevHash | startAndEnd }}
              </RouterLink>
            </div>
            <FillDummy v-else />
          </div>
        </div>
        <div
          v-if="block.height"
          class="block-navigation grid"
        >
          <RouterLink :to="`/block/${(block.height - 1)}`">
            prev: {{ block.height - 1 }}
          </RouterLink>
          <RouterLink
            v-if="block.height"
            :to="`/block/${(block.height + 1)}`"
          >
            next: {{ block.height + 1 }}
          </RouterLink>
        </div>
      </div>
      <div
        v-if="!isKeyBlock"
        class="block-transactions"
      >
        <h2
          v-if="block.height"
          class="title"
        >
          <span class="number">
            {{ block.transactions.length }}
          </span> Transaction(s)
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
        <div
          v-if="block.height"
          class="transactions"
        >
          <Transaction
            v-for="t in block.transactions"
            :key="t.hash"
            :transaction="t"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import Transaction from '../../components/transaction/transaction'
import FillDummy from '../../components/fillDummy'

const blockHashRegex = RegExp('^[km]h_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  name: 'Block',
  components: { RelativeTime, Transaction, FillDummy },
  mixins: [currentTime],
  props: {
    blockId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('blocks', ['block', 'height']),
    isKeyBlock () {
      return this.blockId.startsWith('kh')
    }
  },
  watch: {
    blockId () {
      this.getBlock()
    }
  },
  mounted () {
    this.getBlock()
  },
  methods: {
    getBlock () {
      this.$store.commit('blocks/setBlock', {})
      if (blockHeightRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getBlockFromHeight', Number(this.blockId))
      } else if (blockHashRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getBlockFromHash', this.blockId)
      }
    }
  }
}
</script>
<style scoped src='./block.scss' lang='scss' />
