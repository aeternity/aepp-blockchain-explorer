<template>
  <div class="app-dashboard">
    <div class="graphs-container">
      <div class="graph">
        <canvas id="transaction-rate" />
      </div>
      <div class="graph">
        <canvas id="ae-transacted" />
      </div>
    </div>
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
import { mapState } from 'vuex'
import Chart from 'chart.js'
import transactionRate from './transactionRate'
import aeTransacted from './aeTransacted'

export default {
  name: 'AppDashboard',
  components: {
    Generations,
    Generation
  },
  data () {
    return {
      transactionRate: transactionRate,
      aeTransacted: aeTransacted
    }
  },
  computed:
    mapState('blocks', [
      'generations'
    ]),
  mounted: async function () {
    this.createChart('transaction-rate', this.transactionRate)
    this.createChart('ae-transacted', this.aeTransacted)
    await this.$store.dispatch('blocks/getLatestGenerations', 5)
  },
  methods: {
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      return new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  }
}
</script>
<style lang="scss">
@import "~@aeternity/aepp-components-3/src/styles/fallback/mixins";
.app-dashboard {
  .graphs-container{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

    .graph{
      width: 30em;
      height: 15em;
      margin: 0 2em 3em 0;
      @include phone {
        width: 20em;
        height: 10em;
      }
    }
  }
}
</style>
