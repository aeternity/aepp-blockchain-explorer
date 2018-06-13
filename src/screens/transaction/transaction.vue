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

      <div class='transactions'>
        <transaction v-for='t in transactions' :key='t.hash' :transaction='t'/>
      </div>
      <div class='center'>
        <ae-button
          @click="heightFrom -= 10"
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
import { AeButton, AePanel } from '@aeternity/aepp-components'

export default {
  components: {
    AeButton,
    AePanel
  },

  data () {
    return {
      heightFrom: 0,
      heightTo: 0,
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
      this.heightFrom = this.newHeightFrom
      this.newHeightFrom = 0
      this.heightTo = this.newHeightTo
      this.newHeightTo = 0
    },

    async checkParamsAndLoadTransactions () {
      const { heightFrom, heightTo } = this
      const { height } = this.$store.state
      if (!heightFrom || !heightTo) {
        this.heightFrom = height - 10
        this.heightTo = height
        return
      }
      if (heightFrom > heightTo || heightTo > height) {
        this.heightFrom = Math.min(heightFrom, heightTo, height)
        this.heightTo = Math.min(Math.max(heightFrom, heightTo), height)
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
