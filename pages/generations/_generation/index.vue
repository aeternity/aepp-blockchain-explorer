<template>
  <div class="app-generation-details">
    <PageHeader
      title="Generation Details"
      :has-crumbs="true"
      :has-nav="true"
      :page="{to: '/generations', name: 'Generations'}"
      :subpage="{to: `/generations/${$route.params.generation}`, name: 'Generation Details'}"
      :prev="prev"
      :next="next"
    />
    <GenerationDetails
      :data="generation"
      :dynamic-data="height"
    />
    <MicroBlocks>
      <MicroBlock
        v-for="(microBlock, number) in generation.micro_blocks"
        :key="number"
        :data="microBlock"
      >
        <TXListItem
          v-for="(transaction, index) in microBlock.transactions"
          :key="index"
          :data="transaction.tx"
        />
      </MicroBlock>
    </MicroBlocks>
  </div>
</template>

<script>

import GenerationDetails from '../../../partials/generationDetails'
import MicroBlocks from '../../../partials/microBlocks'
import MicroBlock from '../../../partials/microBlock'
import PageHeader from '../../../components/PageHeader'
import TXListItem from '../../../partials/transactions/txListItem'

export default {
  name: 'AppGenerationDetails',
  components: {
    PageHeader,
    GenerationDetails,
    MicroBlocks,
    MicroBlock,
    TXListItem
  },
  computed: {
    height () {
      return this.$store.state.height
    },
    generation () {
      return this.$store.state.generations.generations[[this.$route.params.generation]]
    },
    prev () {
      const current = this.generation.height
      const last = Number(Object.keys(this.$store.state.generations.generations)[0])
      const prev = this.$store.state.generations.generations[current - 1]
      return last === current ? '' : `/generations/${prev.height}`
    },
    next () {
      const current = this.generation.height
      const next = this.$store.state.generations.generations[current + 1]
      return this.height === current ? '' : `/generations/${next.height}`
    }
  },
  methods: {
    getLast () {
      let heights = []
      for (let generation of this.$store.state.generations.generations) {
        heights.push(generation.height)
      }
      return heights.reverse()[0]
    }
  }
}
</script>
<style scoped >
  /*.currency {
    font-size: .7em;
    margin-left: -.5em;
    text-decoration: none;
  }
  .app-block-height {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    &-num {
      margin-left: .6rem;
      @media (max-width: 449px) {
        margin-top: .6rem;
        font-weight: 500;
      }
      @media (min-width: 450px) {
      font-size: 1.7rem;
    }
    }
    &-wrapper {
      display: flex;
    }
  }*/
</style>
