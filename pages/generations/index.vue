<template>
  <div class="app-generation">
    <PageHeader
      :has-nav="false"
      title="Generations"
    >
      <BreadCrumbs />
    </PageHeader>
    <Generations>
      <Generation
        v-for="item in Object.keys(generations).slice().reverse()"
        :key="item"
        :data="generations[item]" />
    </Generations>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Generations from '~/partials/generations'
import Generation from '~/partials/generation'
import PageHeader from '~/components/PageHeader'
import BreadCrumbs from '~/components/BreadCrumbs'

export default {
  name: 'AppGenerations',
  components: {
    Generations,
    Generation,
    PageHeader,
    BreadCrumbs
  },
  computed: {
    ...mapState('generations', [
      'generations',
      'height'
    ]),
    ...mapGetters('blocks', [
      'getAverageBlockTime',
      'getLastMinedBlockTime'
    ])
  }
}
</script>

<style scoped>

</style>
