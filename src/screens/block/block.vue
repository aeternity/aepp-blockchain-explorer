<template>
  <div class="block-screen screen">
    <div class="block">
      <div class="block-header">
        <h1 class="title title-main">
          Micro Blocks:
        </h1>
        <div class="basic-block-info basic-block-info_reverse grid ">
          <Field
            name="Micro Block Hash"
            class="field__hash"
          >
            <AeHash
              v-if="!isloading"
              :hash="blockHash"
              type="big"
            />
            <FillDummy
              v-else
              size="big"
            />
          </Field>
        </div>
        <div class="basic-block-info grid">
          <Field
            name="Block Height"
            class="field__height"
          >
            <RouterLink
              v-if="!isloading"
              class="number"
              :to="`/generation/${block.height}`"
            >
              {{ block.height }}
            </RouterLink>
            <FillDummy
              v-else
              size="small"
            />
          </Field>
          <Field
            name="Previous Key Hash"
            class="field__hash"
          >
            <RouterLink
              v-if="!isloading"
              :to="`/generation/${block.prevKeyHash}`"
            >
              <AeHash
                :hash="block.prevKeyHash"
                type="big"
              />
            </RouterLink>
            <FillDummy
              v-else
              size="big"
            />
          </Field>
        </div>
        <div class="basic-block-info grid">
          <Field
            name="Block Confirmation"
            class="field__confirmation"
          >
            <div
              v-if="!isloading"
              class="number"
            >
              {{ height - block.height }}
            </div>
            <FillDummy
              v-else
              size="small"
            />
          </Field>
          <Field
            name="Previous Hash"
            class="field__hash"
          >
            <RouterLink
              v-if="!isloading && isPrevKeyBlock"
              :to="`/generation/${block.prevHash}`"
            >
              <AeHash
                :hash="block.prevHash"
                type="big"
              />
            </RouterLink>
            <RouterLink
              v-if="!isloading && !isPrevKeyBlock"
              :to="`/block/${block.prevHash}`"
            >
              <AeHash
                :hash="block.prevHash"
                type="big"
              />
            </RouterLink>
            <FillDummy
              v-if="isloading"
              size="big"
            />
          </Field>
        </div>
      </div>
      <div
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
import Transaction from '../../components/transaction/transaction'
import FillDummy from '../../components/fillDummy'
import Field from '../../components/field'
import AeHash from '../../components/aeHash'

const blockHashRegex = RegExp('^mh_[1-9A-HJ-NP-Za-km-z]{48,50}$')

export default {
  name: 'Block',
  components: {
    Transaction,
    FillDummy,
    Field,
    AeHash
  },
  mixins: [currentTime],
  props: {
    blockHash: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      isloading: true
    }
  },
  computed: mapState('blocks', ['block', 'height']),
  watch: {
    blockHash () {
      this.getBlock()
    }
  },
  async mounted () {
    this.isloading = true
    await this.$store.dispatch('blocks/height')
    await this.getBlock()
    this.isloading = false
  },
  methods: {
    async getBlock () {
      this.isloading = true
      if (blockHashRegex.test(this.blockHash)) {
        await this.$store.dispatch('blocks/getBlockFromHash', this.blockHash)
      }
      this.isloading = false
    },
    isPrevKeyBlock () {
      return this.block.prevKeyHash.startsWith('kh')
    }
  }
}
</script>
<style scoped src='./block.scss' lang='scss' />
