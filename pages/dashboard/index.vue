<template>
  <div>
    <div
      v-if="Object.keys(generations).length"
      class="generations-wrapper"
    >
      <PageHeader
        :has-nav="false"
        title="Generations"
      />
      <Generations>
        <Generation
          v-for="(generation, number) in generations"
          :key="number"
          :data="generation"
        />
      </Generations>
    </div>
    <div
      v-if="transactions.length"
      class="transactions-wrapper"
    >
      <PageHeader
        :has-nav="false"
        title="Transactions"
      />
      <TxList>
        <TXListItem
          v-for="(transaction, index) in transactions"
          :key="index"
          :data="transaction.tx"
        />
      </TxList>
    </div>
  </div>
</template>

<script>
import Generations from '~/partials/generations'
import Generation from '~/partials/generation'
import TxList from '~/partials/transactions/txList'
import TXListItem from '~/partials/transactions/txListItem'
import PageHeader from '~/components/PageHeader'
import { mapState } from 'vuex'

export default {
  name: 'AppGenerations',
  components: {
    Generations,
    Generation,
    TxList,
    TXListItem,
    PageHeader
  },
  data () {
    return {
      transactions: []
    }
  },
  computed:
    mapState('blocks', [
      'generations',
      'height'
    ]),
  async mounted () {
    await this.$store.dispatch('blocks/height')
    this.transactions = await this.$store.dispatch('transactions/getTxByGeneration', { start: 30546, end: 30596 })
    this.transactions = this.transactions.slice(0, 10)
    await this.$store.dispatch('blocks/getLatestGenerations', 10)
  }
}
</script>

<style scoped>

</style>
