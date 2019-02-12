<template>
  <span class="format-ae-unit">
    {{ value | yaniToAe }}
  </span>
</template>
<script>

import txTypeToName from '../../../filters/txTypeToName'

export default {
  name: 'FormatAeUnit',
  filters: { txTypeToName },
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>
<style scoped lang="scss">
    .format-ae-unit {
        & .unit {
          font-size: .7em;
          margin-left: -.7em;
          text-decoration: none;
        }
    }

</style>
