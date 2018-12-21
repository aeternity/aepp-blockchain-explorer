<template>
  <section class="micro-block">
    <article class="block-transactions">
      <header class="block-transactions__header">
        <div class="grid">
          <Field
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
          v-for="t in microBlock.transactions"
          :key="t.hash"
          :transaction="t"
        />
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

export default {
  name: 'MicroBlock',
  components: {
    RelativeTime,
    Transaction,
    Field,
    AeHash
  },
  mixins: [currentTime],
  props: {
    microBlock: {
      type: Object,
      required: true
    },
    microBlockNumber: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped src='./microBlock.scss' lang='scss' />
