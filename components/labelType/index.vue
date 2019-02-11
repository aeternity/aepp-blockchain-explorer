<template>
  <span
    class="label-type"
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
  @import "../../../node_modules/@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "../../../node_modules/@aeternity/aepp-components-3/src/styles/placeholders/typography";
  @import "../../../style/variables";
  .label-type {
    display: table-caption;
    padding: 0.6rem;
    text-transform: uppercase;
    color: white;
    border-radius: 0 5px 5px 0;
    font-weight: bold;
    @extend %face-uppercase-xs;
  }
  .label-type.red {
    background-color: $error;
  }
  .label-type.green {
    background-color: $color-alternative;
  }
  .label-type.black {
    background-color:  $color-neutral-negative-3;
  }
  .label-type.grey {
    background-color: $color-neutral;
  }
</style>
