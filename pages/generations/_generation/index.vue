<template>
  <div class="app-generation-details">
    <PageHeader title="Generation Details">
      <BreadCrumbs />
    </PageHeader>
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
import BreadCrumbs from '../../../components/breadCrumbs'
import TXListItem from '../../../partials/transactions/txListItem'

export default {
  name: 'AppGenerationDetails',
  components: {
    PageHeader,
    GenerationDetails,
    BreadCrumbs,
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
