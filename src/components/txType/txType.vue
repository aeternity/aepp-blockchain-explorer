<template>
  <component :is='tag' :class="['tx-type', txtype]">
    {{txname}}
  </component>
</template>
<script>
import {
  AeBadge
} from '@aeternity/aepp-components'
export default {
  name: 'tx-type',
  props: ['txtype', 'type'],
  components: {
    AeBadge
  },
  computed: {
    tag () {
      if (this.type === 'badge') return 'ae-badge'
      if (this.type === 'h2') return 'h2'
      return 'div'
    },
    txname () {
      return this.txtype
        .replace(/_tx$/, '')
        .replace(/_/g, ' ')
        .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    }
  }
}
</script>
<style lang="scss"></style>
