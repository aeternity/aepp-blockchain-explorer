<template>
  <div class="app-generation-details">
    <PageHeader title="Generation Details">
      <BreadCrumbs/>
    </PageHeader>
    {{ height }}
    <GenerationDetails
      :data="generation"
      :dynamic-data="height"
    />
  </div>
</template>

<script>

import GenerationDetails from '~/partials/generationDetails'
import PageHeader from '~/components/PageHeader'
import BreadCrumbs from '~/components/BreadCrumbs'

export default {
  name: 'AppGenerationDetails',
  components: {
    PageHeader,
    GenerationDetails,
    BreadCrumbs
  },
  computed: {
    height () {
      return this.$store.state.blocks.height
    },
    generation () {
      return this.$store.state.blocks.generations[[this.$route.params.generation]]
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
