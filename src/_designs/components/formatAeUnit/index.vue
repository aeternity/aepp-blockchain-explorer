<template>
  <span class="format-ae-unit">
    {{ formattedValue }}
    <abbr
      v-if="unit"
      class="unit"
    >
      {{ unit }}
    </abbr>
  </span>
</template>
<script>
export default {
  name: 'FormatAeUnit',
  props: {
    value: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      validator: value => [
        'ae',
        'tx',
        'fee',
        'cost'
      ].includes(value),
      default: 'ae'
    }
  },
  computed: {
    formattedValue: function () {
      if (this.type === 'ae' || 'tx') {
        return this.value.toLocaleString()
      }
      return this.value
    },
    unit: function () {
      if (this.type === 'ae') {
        return 'AE'
      } else if (this.type === 'tx') {
        return ''
      }
      return 'ATTO'
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
