<template>
  <div>
    <div
      class="generations-wrapper"
    >
      <PageHeader
        :has-nav="false"
        title="Generations"
      />
      <Generations>
        <Generation
          v-for="(generation, number) in localGenerations.reverse()"
          :key="number"
          :v-if="number < 10"
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
          v-for="(transaction, index) in localTransactions.reverse()"
          :key="index"
          :v-if="index < 10"
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
      localGenerations: [],
      localTransactions: []
    }
  },
  computed: {
    ...mapState('generations', {
      generations (state) {
        return Object.values(state.generations)
      }
    }),
    ...mapState('transactions', {
      transactions (state) {
        return Object.values(state.transactions)
      }
    })
  },
  beforeMount () {
    let data1 = JSON.parse(JSON.stringify(this.generations))
    let data2 = JSON.parse(JSON.stringify(this.transactions))
    this.localGenerations = data1
    this.localTransactions = data2
  },
  mounted () {
    const exampleSocket = new WebSocket('ws://127.0.0.1:3020')

    exampleSocket.onopen = e => {
      exampleSocket.send('{"op":"subscribe", "payload": "key_blocks"}')
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
      }
    },
    updateTxList (tx) {
      this.localTransactions.push(tx)
    },
    updateGenList (gen) {
      if (!Object.keys(this.currentGen).length) {
        this.currentGen = { ...{}, ...gen, micro_blocks: [] }
      } else {
        this.localGenerations.push(this.currentGen)
        this.currentGen = { ...{}, ...gen, micro_blocks: [] }
      }
    }
  }
}
</script>

<style scoped>

</style>
