<template>
  <div class="app-dashboard">
    <div class="graphs">
      <div class="graph-transaction-rate">
        <canvas id="transaction-rate" />
      </div>
      <div class="graph-ae-transacted">
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
  computed:
    mapState('blocks', [
      'generations'
    ]),
  data () {
    return {
      transactionRate: transactionRate,
      aeTransacted: aeTransacted
    }
  },
  mounted: async function () {
    this.createChart('transaction-rate', this.transactionRate)
    this.createChart('ae-transacted', this.aeTransacted)
    await this.$store.dispatch('blocks/getLatestGenerations', 5)
  },
  methods: {
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  }
}
</script>
<style lang="scss">
.app-dashboard {
  .graphs{
    canvas{
      width:100%;
      height: auto;
    }
    .graph-transaction-rate{
      max-width:40em;
      max-height: 20em;
      margin-bottom: 10em;
    }
    .graph-ae-transacted{
      margin-bottom: 10em;
      max-width:40em;
      max-height: 20em;
    }
  }
}
</style>
