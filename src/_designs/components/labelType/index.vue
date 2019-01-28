<template>
  <span
    class="label-wrapper"
    :class="{[fill]: Boolean(fill)}"
  >
    {{ title }}
  </span>
</template>
<script>
export default {
  name: 'LabelType',
  props: {
    title: {
      type: String,
      required: true
    },
    fill: {
      type: String,
      validator: value => [
        'red',
        'green',
        'black',
        'grey'
      ].includes(value),
      default: 'grey'
    }
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  .label-wrapper {
    display: table-caption;
    padding: 0.6rem;
    text-transform: uppercase;
    color: white;
    border-radius: 0 5px 5px 0;
    font-weight: bold;
  }
  .label-wrapper.red {
    background-color: red;
  }
  .label-wrapper.green {
    background-color: green;
  }
  .label-wrapper.black {
    background-color: black;
  }
  .label-wrapper.grey {
    background-color: $color-neutral-negative-3;
  }
</style>
