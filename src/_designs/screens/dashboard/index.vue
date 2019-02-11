<template>
  <div class="app-dashboard">
    <PageHeader title="Dashboard">
      <BreadCrumbs />
    </PageHeader>
    <h1>Generations</h1>
    <Generations v-if="generations">
      <Generation
        v-for="(generation, number) in generations"
        :key="number"
        :data="generation"
      />
    </Generations>
    <br>
    <h1>Transactions</h1>
    <TxList v-if="transactionsList.length">
      <TXListItem
        v-for="(transaction, index) in transactionsList"
        :key="index"
        :data="transaction.tx"
      />
    </TxList>
  </div>
</template>
<script>
import Generations from '@/_designs/components/generations'
import Generation from '@/_designs/components/generation'
import TxList from '@/_designs/components/transactions/txList'
import TXListItem from '@/_designs/components/transactions/txListItem'
import PageHeader from '@/_designs/components/PageHeader'
import BreadCrumbs from '@/_designs/components/BreadCrumbs'
import { mapState } from 'vuex'

export default {
  name: 'AppDashboard',
  components: {
    PageHeader,
    Generations,
    Generation,
    BreadCrumbs,
    TxList,
    TXListItem
  },
  data () {
    return {
      transactionsList: []
    }
  },
  computed:
    mapState('blocks', [
      'generations',
      'height'
    ]),
  mounted: async function () {
    await this.$store.dispatch('blocks/getLatestGenerations', 5)
    await this.$store.dispatch('blocks/height')
    await this.fetchTx()
  },
  methods: {
    fetchTx: async function () {
      try {
        this.transactionsList = await this.$store.dispatch('transactions/getTxByGeneration', {
          start: this.height - 10,
          end: this.height
        })
      } catch (error) {
      }
    }
  }
}
</script>
<style lang="scss">
  .app-dashboard {}
</style>
