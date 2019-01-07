<template>
  <div
    class="app-table-row"
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
@import "~@aeternity/aepp-components-3/src/styles/variables/colors";

.app-table-row{
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

  @media (min-width: 450px) {
    width: 100%;
    padding: 0;
  }
}

</style>
