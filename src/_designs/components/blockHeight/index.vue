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
    @media (max-width: 449px) {
      margin-top: .6rem;
      font-weight: 500;
    }
    @media (min-width: 450px) {
      font-size: 1.7rem;
    }
  }
</style>
