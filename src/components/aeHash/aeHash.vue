<template>
  <div :class="['ae-hash', `_type_${type}`]">
    <div v-if="type === 'short'">
      {{displayAddress | startAndEnd}}
    </div>
    <div v-else-if="type === 'chunked'">
      <div v-for="chunk of displayAddress" class="chunk">
        {{chunk}}
      </div>
    </div>
    <div v-else>
      {{displayAddress}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ae-hash',
  props: {
    /**
     * The hash to display.
     */
    'hash': {
      type: String,
      required: true
    },

    /**
     * Show the 'full' hash, 'chunked' (full hash grouped by chunks ) or 'short' (show first 6 and last 6 characters)
     */
    'type': {
      type: String,
      default: 'full'
    }
  },
  data () {
    return {
      showHash: false
    }
  },
  computed: {
    displayAddress () {
      if (this.type === 'full') { return this.hash }
      if (this.type === 'chunked') { return this.hash.match(/.{1,7}/g) }
      return this.hash
    }
  }
}
</script>
