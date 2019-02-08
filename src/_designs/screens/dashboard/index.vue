<template>
  <div class="app-dashboard">
    <PageHeader title="Dashboard">
      <BreadCrumbs />
    </PageHeader>
    <Generations v-if="generations">
      <Generation
        v-for="(generation, number) in generations"
        :key="number"
        :data="generation"
      />
    </Generations>
  </div>
</template>
<script>
import Generations from '@/_designs/components/generations'
import Generation from '@/_designs/components/generation'
import PageHeader from '@/_designs/components/PageHeader'
import BreadCrumbs from '@/_designs/components/BreadCrumbs'
import { mapState } from 'vuex'

export default {
  name: 'AppDashboard',
  components: {
    PageHeader,
    Generations,
    Generation,
    BreadCrumbs
  },
  computed:
    mapState('blocks', [
      'generations'
    ]),
  mounted: async function () {
    await this.$store.dispatch('blocks/getLatestGenerations', 5)
  }
}
</script>
<style lang="scss">
.app-dashboard {}
</style>
