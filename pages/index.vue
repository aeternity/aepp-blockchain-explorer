<template>
  <div class="app-dashboard">
    <PageHeader
      title="Dashboard">
      <BreadCrumbs />
    </PageHeader>
    <!--<Generations v-if="generations">-->
    <!--<Generation-->
    <!--v-for="(generation, number) in generations"-->
    <!--:key="number"-->
    <!--:data="generation"-->
    <!--/>-->
    <!--</Generations>-->
  </div>
</template>
<script>
// import Generations from '~/components/generations'
// import Generation from '~/components/generation'
import '@aeternity/aepp-components-3/dist/aepp.components.css'
import '@aeternity/aepp-components-3/dist/aepp.fonts.css'
import PageHeader from '~/components/PageHeader'
import BreadCrumbs from '~/components/BreadCrumbs'

export default {
  name: 'AppDashboard',
  layout: 'default',
  components: {
    PageHeader,
    // Generations,
    // Generation
    BreadCrumbs
  },
  data () {
    return {
      generations: {}
    }
  }
}
</script>
