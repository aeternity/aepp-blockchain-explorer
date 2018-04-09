<template>
  <div class="transaction-screen screen">
    <div class="inner">

      <h1 class='title'>Transactions</h1>
      <form class="grid" @submit.prevent="setNewHeight">
        <div>
          load all transactions from block
        </div>

        <div>
          <input
            :value="newHeightFrom || heightFrom"
            @input="newHeightFrom = $event.target.value"
            type="number"
          />
        </div>

        <div>
          to:
          <input
            :value="newHeightTo || heightTo"
            @input="newHeightTo = $event.target.value"
            type="number"
          />
        </div>

        <ae-button size='small' type='exciting'>
          load
        </ae-button>

      </form>

      <div class='transaction-list'>
        <ae-panel v-for='t in transactions' :key='t.hash'>
          <transaction :transaction='t'/>
        </ae-panel>
      </div>
      <div class='center'>
        <ae-button
          :to="{ name: 'Transaction', params: { heightFrom: heightFrom - 10, heightTo } }"
          type='exciting' class="load-more"
        >
          Load more
        </ae-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  AeButton,
  AePanel
} from '@aeternity/aepp-components'
import Transaction from '../../components/transaction/transaction.vue'
export default {
  components: {
    AeButton,
    AePanel,
    Transaction
  },
  props: ['heightFrom', 'heightTo'],
  data () {
    return {
      newHeightFrom: 0,
      newHeightTo: 0
    }
  },
  computed: mapState({
    transactions (state) {
      const blocks = []
      for (let height = this.heightFrom; height <= this.heightTo; height++) {
        if (!state.blocks[height]) continue
        blocks.unshift(state.blocks[height].transactions)
      }
      return blocks.reduce((p, n) => [...p, ...n], [])
    }
  }),
  methods: {
    setNewHeight () {
      this.$router.push({
        name: 'Transaction',
        params: {
          heightFrom: this.newHeightFrom || this.heightFrom,
          heightTo: this.newHeightTo || this.heightTo
        }
      })
      this.newHeightFrom = 0
      this.newHeightTo = 0
    },
    async checkParamsAndLoadTransactions () {
      const { heightFrom, heightTo } = this
      const { height } = this.$store.state

      const params =
        ((!heightFrom || !heightTo) && {
          heightFrom: height - 10,
          heightTo: height
        }) ||
        ((heightFrom > heightTo || heightTo > height) && {
          heightFrom: Math.min(heightFrom, heightTo, height),
          heightTo: Math.min(Math.max(heightFrom, heightTo), height)
        })
      if (params) {
        this.$router.replace({ name: 'Transaction', params })
        return
      }

      for (let height = this.heightFrom; height <= this.heightTo; height++) {
        this.$store.dispatch('loadBlock', { height })
      }
    }
  },
  async mounted () {
    if (!this.$store.state.height) {
      await this.$store.dispatch('fetchHeight')
    }
    this.$watch(
      function () { return [this.heightFrom, this.heightTo] },
      this.checkParamsAndLoadTransactions,
      { immediate: true }
    )
  }
}
</script>
<style src='./transaction.scss' lang='scss' />
