<template>
  <div
    class="generations-wrapper"
  >
    <PageHeader
      :has-nav="false"
      title="Generations"
    />
    <Generations>
      <nuxt-link
        v-for="(generation, number) in Object.values(generations).reverse()"
        :key="number"
        :to="`/generations/${generation.height}`"
        class="generation-link"
      >
        <Generation
          :data="generation"
        />
      </nuxt-link>
    </Generations>
    <LoadMoreButton @update="loadMoreGen" />
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Generations from '../../partials/generations'
import Generation from '../../partials/generation'
import PageHeader from '../../components/PageHeader'
import LoadMoreButton from '../../components/loadMoreButton'
// import BreadCrumbs from '../../components/breadCrumbs'

export default {
  name: 'AppGenerations',
  components: {
    Generations,
    Generation,
    PageHeader,
    // BreadCrumbs,
    LoadMoreButton
  },
  data () {
    return {
      limitGen: 10
    }
  },
  computed: {
    ...mapState('generations', [
      'generations'
    ])
  },
  methods: {
    async loadMoreGen () {
      this.limitGen += 10
    }
  }
}
</script>

<style scoped lang='scss'>
  .generations-wrapper {
    .generation-link {
      &:hover {
        color: #000000;
      }
    }
  }
</style>
