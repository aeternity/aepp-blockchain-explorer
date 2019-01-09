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
            <RouterLink
              v-if="block.height"
              :to="`/block/${block.hash}`"
            >
              <AeHash
                :hash="block.hash"
                type="big"
              />
            </RouterLink>
            <FillDummy v-else />
          </Field>
        </div>
        <div class="basic-block-info grid">
          <Field
            name="Block Height"
            class="field__height"
          >
            <RouterLink
              v-if="block.height"
              :to="`/generation/${block.height}`"
            >
              <AeHash
                :hash="block.height.toString()"
                type="big"
              />
            </RouterLink>
            <FillDummy v-else />
          </Field>
          <Field
            name="Previous Key Hash"
            class="field__hash"
          >
            <RouterLink
              v-if="block.prevKeyHash"
              :to="`/block/${block.prevKeyHash}`"
            >
              <AeHash
                :hash="block.prevKeyHash"
                type="big"
              />
            </RouterLink>
            <FillDummy v-else />
          </Field>
        </div>
        <div class="basic-block-info grid">
          <Field
            name="Block Confirmation"
            class="field__confirmation"
          >
            <div
              v-if="height"
              class="number"
            >
              {{ height - block.height }}
            </div>
          </Field>
          <Field
            name="Previous Hash"
            class="field__hash"
          >
            <RouterLink
              v-if="block.prevHash"
              :to="definePreviusHash()"
            >
              <AeHash
                :hash="block.prevHash"
                type="big"
              />
            </RouterLink>
            <FillDummy v-else />
          </Field>
        </div>
      </div>
      <div
        v-if="!isKeyBlock"
        class="block-transactions"
      >
        <div
          v-if="block.height"
          class="transactions"
        >
          <MicroBlock
            :micro-block="block"
            :micro-block-number="0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import currentTime from '../../mixins/currentTime'
import FillDummy from '../../components/fillDummy'
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import MicroBlock from '../../components/microBlock/microBlock'

const blockHashRegex = RegExp('^[km]h_[1-9A-HJ-NP-Za-km-z]{48,50}$')
const blockHeightRegex = RegExp('^[0-9]+')

export default {
  name: 'Block',
  components: {
    FillDummy,
    Field,
    AeHash,
    MicroBlock
  },
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
  async mounted () {
    await this.getBlock()
    await this.$store.dispatch('blocks/height')
  },
  methods: {
    getBlock () {
      this.$store.commit('blocks/setBlock', {})
      if (blockHeightRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getBlockFromHeight', Number(this.blockId))
      } else if (blockHashRegex.test(this.blockId)) {
        this.$store.dispatch('blocks/getBlockFromHash', this.blockId)
      }
    },
    definePreviusHash () {
      return this.block.prevHash.startsWith('kh') ? `/generation/${this.block.height}` : `/block/${this.block.prevHash}`
    }
  }
}
</script>
<style scoped src='./block.scss' lang='scss' />
