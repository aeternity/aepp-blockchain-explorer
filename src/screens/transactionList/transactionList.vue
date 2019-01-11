<template>
  <div class="tx-list screen">
    <div class="inner">
      <div class="title">
        Transactions
      </div>
      <div class="grid">
        <AeInput
          v-model="startGeneration"
          autofocus
          type="number"
          class="startGeneration"
          name="startGeneration"
          label="From"
          placeholder="Start Generation"
        />
        <AeLabel>
          To
        </AeLabel>
        <AeInput
          v-model="endGeneration"
          autofocus
          type="number"
          class="endGeneration"
          name="endGeneration"
          label="To"
          placeholder="End Generation"
        />
        <AeButton
          type="exciting"
          @click="update"
        >
          Submit
        </AeButton>
      </div>
      <AeLoader
        v-if="!loaded"
      />
      <div
        v-if="loaded"
        class="transactions"
      >
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
import { AeLoader, AeInput, AeButton, AeLabel } from '@aeternity/aepp-components'
import Transaction from '../../components/transaction/transaction'

export default {
  name: 'TransactionList',
  components: {
    Transaction,
    AeLoader,
    AeInput,
    AeLabel,
    AeButton
  },
  data: function () {
    return {
      startGeneration: 0,
      endGeneration: 0,
      transactions: [],
      loaded: false
    }
  },
  beforeMount: async function () {
    const { start, end } = this.$route.params
    this.startGeneration = start
    this.endGeneration = end
    try {
      this.validate()
      await this.fetchTx()
    } catch (error) {
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    update: async function () {
      this.validate()
      this.$router.push({ path: `/transactions/${this.startGeneration}/${this.endGeneration}` })
      await this.fetchTx()
    },
    fetchTx: async function () {
      try {
        this.loaded = false
        this.transactions = await this.$store.dispatch('transactions/getTxByGeneration', { start: this.startGeneration, end: this.endGeneration })
        this.loaded = true
      } catch (error) {
      }
    },
    validate: function () {
      if (Number(this.startGeneration) > Number(this.endGenerationd)) {
        throw new Error('Invalid start and end generation')
      }
    }
  }
}
</script>

<style scoped src='./transactionList.scss' lang='scss' />
