<template>
  <section class="micro-block">
    <div class="grid">
      <Field
        name="hash"
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
        v-cloak
        name="time since mined"
      >
        <RelativeTime
          :ts="currentTime - microBlock.time"
          spaced
        />
      </Field>
    </div>
    <div class="grid">
      <Field
        v-cloak
        name="time"
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

    <article class="block-transactions">
      <header class="block-transactions__header">
        <h2 class="title title-sub">
          <span class="number">
            {{ microBlock.transactions.length }}
          </span> Transaction{{ microBlock.transactions.length !== 1 ? 's' : '' }}
        </h2>
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
    }
  }
}
</script>

<style scoped src='./microBlock.scss' lang='scss' />
