<template>
  <span class="format-ae-unit">
    {{ formattedValue }}
    <abbr
      class="unit"
      title="aeternity"
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
        'fee',
        'cost'
      ].includes(value),
      default: 'ae'
    }
  },
  computed: {
    formattedValue: function () {
      if (this.type === 'ae') {
        return this.value.toLocaleString()
      }
      return this.value
    },
    unit: function () {
      if (this.type === 'ae') {
        return 'AE'
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
