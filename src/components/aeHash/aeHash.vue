<template>
  <span class="ae-hash">
    {{ displayHash }}
  </span>
</template>

<script>
import startAndEnd from '../../filters/startAndEnd'

export default {
  name: 'ae-hash',
  props: {
    /**
     * The hash to display.
     */
    hash: {
      type: String,
      required: true
    },

    /**
     * Show the 'full' hash, 'chunked' (full hash grouped by chunks ) or 'short' (show first 6 and last 6 characters)
     */
    type: {
      type: String,
      default: 'full'
    }
  },
  computed: {
    displayHash () {
      switch (this.type) {
        case 'short':
          return startAndEnd(this.hash)
        case 'chunked':
          return this.hash.match(/.{1,7}/g).join(' ')
        default:
          return this.hash
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ae-hash {
  font-family: 'Roboto Mono', monospace;
  font-weight: 500;
}
</style>
