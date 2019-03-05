<template>
  <div>
    <no-ssr>
      <div
        v-if="localGenerations.length"
        class="generations-wrapper"
      >
        <PageHeader
          :has-nav="false"
          title="Generations"
        />
        <Generations>
          <Generation
            v-for="(generation, index) in localGenerations.slice(0,5)"
            :key="index"
            :data="generation"
          />
        </Generations>
      </div>
      <div
        class="transactions-wrapper"
      >
        <PageHeader
          :has-nav="false"
          title="Transactions"
        />
        <TxList>
          <TXListItem
            v-for="(transaction, index) in localTransactions.slice(0,5)"
            :key="index"
            :data="transaction.tx"
          />
        </TxList>
      </div>
    </no-ssr>
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
  name: 'AppDashboard',
  components: {
    Generations,
    Generation,
    TxList,
    TXListItem,
    PageHeader
  },
  data () {
    return {
      data: {},
      currentGen: {},
      microBlocks: [],
      localGenerations: [],
      localTransactions: []
    }
  },
  computed: {
    ...mapState('generations', {
      generations (state) {
        return Object.values(state.generations).reverse()
      }
    }),
    ...mapState('transactions', {
      transactions (state) {
        return Object.values(state.transactions)
      }
    })
  },
  beforeMount () {
    let data1 = this.generations
    let data2 = this.transactions
    this.localGenerations = data1
    this.localTransactions = data2
  },
  mounted () {
    const exampleSocket = new WebSocket('ws://127.0.0.1:3020')

    exampleSocket.onopen = e => {
      exampleSocket.send('{"op":"subscribe", "payload": "key_blocks"}')
      exampleSocket.send('{"op":"subscribe", "payload": "micro_blocks"}')
      exampleSocket.send('{"op":"subscribe", "payload": "transactions"}')

      exampleSocket.onmessage = e => {
        this.getWsData(e.data)
      }
    }
  },
  methods: {
    getWsData (resp) {
      if (resp.includes('payload')) {
        this.data = JSON.parse(resp).payload
        if (this.data.tx) {
          this.updateTxList(this.data)
        }

        if (this.data.beneficiary) {
          this.updateGenList(this.data)
        }

        if (this.data.key_block_id) {
          this.updateMicroBlocks(this.data)
        }
      }
    },
    updateTxList (tx) {
      this.localTransactions.splice(0, 0, tx)
    },
    updateMicroBlocks (mb) {
      this.microBlocks.push({ ...{}, ...mb })
    },
    updateGenList (gen) {
      if (!Object.keys(this.currentGen).length) {
        this.currentGen = { ...{}, ...gen, micro_blocks: [] }
      } else {
        // this.currentGen.micro_blocks = this.localTransactions.filter(tx => tx.block_height === this.currentGen.height)
        this.currentGen.micro_blocks = this.microBlocks
          .filter(mb => mb.prev_key_hash === this.currentGen.hash)
          .map(mb => {
            return { ...{}, ...mb, transactions: this.localTransactions.filter(tx => tx.block_hash === mb.hash) }
          })
        this.localGenerations.splice(0, 0, this.currentGen)
        this.microBlocks = []
        this.currentGen = { ...{}, ...gen, micro_blocks: [] }
      }
    }
  }
}
</script>

<style scoped>

</style>
