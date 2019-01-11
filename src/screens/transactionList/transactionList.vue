<template>
  <div class="tx-list screen">
    <div class="inner">
      <div class="transactions">
        <Transaction
          v-for="t in transactions"
          :key="t.hash"
          :transaction="t"
        />
      </div>
    </div>
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
  beforeMount: async function () {
    const { start, end } = this.$route.params
    try {
      if (Number(start) > Number(end)) {
        throw new Error('Invalid start and end generation')
      }
      this.transactions = await this.$store.dispatch('transactions/getTxByGeneration', { start, end })
    } catch (error) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped src='./transactionList.scss' lang='scss' />
