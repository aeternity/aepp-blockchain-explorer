<template>
  <div class="app-dashboard">
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
import Generations from '../partials/generations'
import Generation from '../partials/generation'

export default {
  name: 'AppDashboard',
  layout: 'default',
  components: {
    Generations,
    Generation
  },
  data () {
    return {
      generations: {}
    }
  }
}
</script>
