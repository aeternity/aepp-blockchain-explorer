<template>
  <div
    class="app-table-row"
    :class="{
      extend,
      nested,
      reorder
    }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'AppTableRow',
  props: {
    extend: Boolean,
    nested: Boolean,
    reorder: Boolean
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";

  .app-table-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: top;
    width: 100%;
    &:not(:last-child) {
      border-bottom: 2px solid $color-neutral-positive-2;
    }
  }

  .app-table-row.extend {
    margin-top: .6rem;
    padding-top: .6rem;
    margin-bottom: 0;
    border-left: none;
    //border-top: 2px solid $color-neutral-positive-2;
    @media (min-width: 450px) {
      width: 50%;
      padding-top: 0;
      margin-top: 0;
      border-left: 2px solid $color-neutral-positive-2;
    }
    @media (min-width: 1600px) {
      border-top: none;
      width: 25%;
    }
  }

  .app-table-row > .app-table-cell {
    width: 50%;
    &:not(:first-child) {
      border-left:  2px solid $color-neutral-positive-2;
    }
    @media (min-width: 450px) {
      width: 50%;
    }
  }
</style>
