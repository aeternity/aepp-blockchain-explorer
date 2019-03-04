<template>
  <div
    class="generations-wrapper"
  >
    <PageHeader
      :has-nav="false"
      title="Generations"
    />
    <Generations>
      <Generation
        v-for="item in Object.keys(generations).slice().reverse()"
        :key="item"
        :data="generations[item]"
      />
    </Generations>
    <LoadMoreButton @update="loadMoreGen" />
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Generations from '../../partials/generations'
import Generation from '../../partials/generation'
import PageHeader from '../../components/PageHeader'
import BreadCrumbs from '../../components/breadCrumbs'

export default {
  name: 'AppGenerations',
  components: {
    Generations,
    Generation,
    PageHeader,
    BreadCrumbs,
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
      await this.$store.dispatch('generations/getLatestGenerations', this.limitGen)
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
