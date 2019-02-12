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
  },
  computed: {
    formattedValue: function () {
      return this.filterType(this.type, this.value)
    },
    unit: function () {
      if (this.type === 'ae') {
        return 'AE'
      } else if (this.type === 'tx') {
        return ''
      }
      return 'ATTO'
    }
  },
  methods: {
    filterType (type, value) {
      if (type === 'ae') {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2 })
      } else if (type === 'tx') {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2 })
      } else {
        return value
      }
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
