<template>
  <div
    class="app-table-cell"
    :class="{
      extend
    }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'AppTableCell',
  props: {
    extend: Boolean
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";

  .app-table-cell {
    display: flex;
    flex-direction: column;
    //padding: .8rem;
    width: 100%;
    @media (min-width: 450px) {
    width: 50%;
    }
    &:not(:first-child){
      @media (min-width: 450px) {
        border-left: 2px solid $color-neutral-positive-2;
      }
    }
  }
  /*
  * When cell should take the full width
  */
  .app-table-cell.extend {
    margin-bottom:  auto;
    width: 100%;
    @media (min-width: 450px) {
      margin-right: auto;
    }
  }
</style>
