<template>
  <section class="micro-block">
    <article class="block-transactions">
      <header class="block-transactions__header">
        <div class="grid">
          <div class="block-number field">
            Micro Block No. {{ microBlockNumber +1 }}
          </div>
          <Field
            name="Micro Block Hash"
            class="hash"
          >
            <RouterLink :to="`/block/${microBlock.hash}`">
              <AeHash
                :hash="microBlock.hash"
                type="short"
              />
            </RouterLink>
            <ViewAndCopy :text="microBlock.hash" />
          </Field>
          <Field
            name="parent hash"
            class="hash"
          >
            <RouterLink :to="`/block/${microBlock.prevHash}`">
              <AeHash
                :hash="microBlock.prevHash"
                type="short"
              />
            </RouterLink>
            <ViewAndCopy :text="microBlock.prevHash" />
          </Field>
        </div>
        <div class="grid grid_last">
          <div class="field transaction-field">
            <div class="field-name label">
              Transaction{{ microBlocksLength !== 1 ? 's' : '' }}
            </div>
            <span class="number">
              {{ microBlocksLength }}
            </span>
          </div>
          <Field
            v-cloak
            name="age"
            class="age"
          >
            <RelativeTime
              :ts="currentTime - microBlock.time"
              spaced
            />
          </Field>
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
import ViewAndCopy from '../../components/viewAndCopy.vue'

export default {
  name: 'MicroBlock',
  components: {
    RelativeTime,
    Transaction,
    Field,
    AeHash,
    ViewAndCopy
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
    },
    microBlocksLength: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped src='./microBlock.scss' lang='scss' />
