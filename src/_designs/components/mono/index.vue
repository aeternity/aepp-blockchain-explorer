<template>
  <span>
    <slot />
  </span>
</template>
<script >
export default {
  name: 'Mono'
}
</script>
<style lang="scss" scoped>
@import '../../styles/index';
span {
  font-family: $font-mono;
  line-height: inherit;
  font-size: inherit;
}
</style>
