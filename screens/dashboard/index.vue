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
import Generations from '~/components/generations'
import Generation from '~/components/generation'
import PageHeader from '~/components/PageHeader'
import BreadCrumbs from '~/compnents/BreadCrumbs'

export default {
  name: 'AppDashboard',
  components: {
    PageHeader,
    Generations,
    Generation,
    BreadCrumbs
  },
  data () {
    return {
      generations: {}
    }
  }
}
</script>
<style lang="scss">
.app-dashboard {}
</style>
