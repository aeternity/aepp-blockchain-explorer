<template>
  <div class="transactions">
    <Transaction
      v-for="t in transactions"
      :key="t.hash"
      :transaction="t"
    />
  </div>
</template>
<script>
import Transaction from '../../components/transaction/transaction'

export default {
  name: 'TransactionList',
  components: {
    Transaction
  },
  props: {
  },
  data: function () {
    return {
      transactions: []
    }
  },
  computed: {
  },
  beforeMount: async function () {
  },
  mounted: async function () {
    const { start, end } = this.$route.params
    console.log(start, end)
    this.transactions = await this.$store.dispatch('transactions/getTxByGeneration', { start: start, end: end })
    console.log(this.transactions)
  },
  methods: {
  }
}
</script>

<style scoped src='./transactionList.scss' lang='scss' />
