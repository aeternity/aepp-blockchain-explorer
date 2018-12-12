<template>
  <div
    class="app-row"
    :class="{
      extend
    }"
  >
    <slot />
  </div>
</template>
<script >
export default {
  name: 'AppTableRow',
  props: {
    extend: Boolean
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/index';

.app-row{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: .8rem 0;

  &:first-child {
    border-top: 2px solid $color-neutral-positive-2;
  }

  &:not(:last-child) {
    border-bottom: 2px solid $color-neutral-positive-2;
  }
  &:last-child {
    border-bottom: none;
  }

  @include sm-lg {
    display: table;
    width: 100%;
  }
}

</style>
