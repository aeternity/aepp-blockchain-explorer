<template>
  <span class="block-height">
    {{ value }}
  </span>
</template>
<script>
export default {
  name: 'BlockHeight',
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .block-height {
    font-size: 1.7rem;
    margin-left: .6rem;
  }
</style>
