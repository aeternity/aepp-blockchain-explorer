<template>
  <div
    :class="transaction.tx.type"
    class="transaction"
  >
    <div class="body">
      <MainTx
        v-if="transaction.tx.type"
        :transaction="transaction"
      />
      <template v-else>
        {{ transaction }}
      </template>
    </div>
  </div>
</template>
<script>
import MainTx from './mainTx'

export default {
  name: 'Transaction',
  components: {
    MainTx
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  computed: {
    responsePrettyJson () {
      if (!this.transaction) return null
      if (!this.transaction.tx.response) return null
      try {
        return JSON.parse(this.transaction.tx.response)
      } catch (e) {
        return null
      }
    }
  }
}
</script>
<style src='./transaction.scss' lang='scss' />
