<template>
  <section class="micro-block">
    <article class="block-transactions">
      <header class="block-transactions__header">
        <div class="grid">
          <span
            v-if="microBlockNumber < 0"
            class="block-number"
          />
          <Field
            v-if="microBlockNumber >= 0"
            class="block-number field"
            name="Micro Block"
          >
            {{ microBlockNumber + 1 }}
          </Field>
          <Field
            name="Micro Block Hash"
            class="hash"
          >
            <RouterLink :to="`/block/${microBlock.hash}`">
              <AeHash
                :hash="microBlock.hash"
                type="full"
              />
            </RouterLink>
          </Field>
        </div>
        <div class="grid grid_last">
          <div class="field transaction-field">
            {{ microBlock.transactions.length }} Transaction{{ microBlock.transactions.length !== 1 ? 's' : '' }}
          </div>
          <Field
            v-cloak
            name="Time Stamp"
            class="time"
          >
            <time
              :timedate="microBlock.time | humanDate"
              class="field-value number"
            >
              {{ microBlock.time | humanDate }}
            </time>
          </Field>
          <Field
            v-cloak
            name="age"
            class="age"
          >
            <RelativeTime
              :ts="currentTime - microBlock.time"
            />
          </Field>
        </div>
      </header>
      <div class="transactions">
        <Transaction
          v-for="t in microBlock.transactions.slice(0, numTransactions)"
          :key="t.hash"
          :transaction="t"
        />
      </div>
      <div
        v-if="needMore"
        class="center"
      >
        <AeButton
          type="dramatic"
          size="small"
          @click="loadMore"
        >
          more txs
        </AeButton>
      </div>
    </article>
  </section>
</template>
<script>
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import Transaction from '../../components/transaction/transaction'
import Field from '../../components/field'
import AeHash from '../../components/aeHash'
import { AeButton } from '@aeternity/aepp-components'

export default {
  name: 'MicroBlock',
  components: {
    RelativeTime,
    Transaction,
    Field,
    AeHash,
    AeButton
  },
  mixins: [currentTime],
  props: {
    microBlock: {
      type: Object,
      required: true
    },
    microBlockNumber: {
      type: Number,
      required: false,
      default: -1
    }
  },
  data: function () {
    return {
      numTransactions: Math.min(10, this.microBlock.transactions.length)
    }
  },
  computed: {
    needMore () {
      return this.microBlock.transactions.length > this.numTransactions
    }
  },
  methods: {
    loadMore () {
      this.numTransactions = Math.min(
        this.numTransactions + 10,
        this.microBlock.transactions.length
      )
    }
  }
}
</script>

<style scoped src='./microBlock.scss' lang='scss' />
