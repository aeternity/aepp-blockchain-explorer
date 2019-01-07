<template>
  <div
    class="app-table-header-row-cell"
    :class="{
      float,
      extend
    }"
  >
    <span
      class="app-table-header-row-cell-title"
    >
      <slot name="title" />
    </span>
    <span class="app-table-header-row-cell-content">
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  name: 'AppTableHeaderRowCell',
  props: {
    float: Boolean,
    extend: Boolean
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";

  .app-table-header-row-cell {
    display: flex;
    flex-direction: column;
    padding: .8rem;
    width: 50%;

    &:not(:first-child) {
      border-left: 2px solid $color-neutral-positive-2;
      border-bottom: 2px solid $color-neutral-positive-2;
    }

    &:last-child {
      border-bottom: none;
    }
    @media (min-width: 450px) {
      width: 25%;
    }
  }
  @media (min-width: 450px) {
  :not(.nested) > .app-table-header-row-cell{
    &:not(:first-child) {
      border-bottom: none;
    }
    &:last-child{
      width: calc(25% - 1px);
      margin-left: 1px;
    }
  }
  }
  /*when cell is in nested row */
  .nested > .app-table-header-row-cell {
    width: 100%;
    border-left:none;
    border-bottom: none;
    &:first-child {
      border-bottom: 2px solid $color-neutral-positive-2;
      @media (min-width: 450px) {
        border-bottom: none;
      }
    }
    @media (min-width: 450px) {
      width: 50%;
      &:last-child {
        border-left: 2px solid $color-neutral-positive-2;
      }
    }
  }
  .extend > .app-table-header-row-cell {
    width: 50%;
    &:first-child {
      border-bottom: none;
    }
    @media (min-width: 450px) {
      width: 50%;
    }
  }
  .nested.extend > .app-table-header-row-cell {
    &:last-child {
      border-left: 2px solid $color-neutral-positive-2;
    }
  }
  /*when cell should be large on mobile*/
  .app-table-header-row-cell.extend {
    margin-bottom:  auto;
    @media (min-width: 450px) {
      width: 50%;
      margin-right: auto;
    }
  }
  /*when cell should break natural flow*/
@media (min-width: 450px) {
  .app-table-header-row.reorder > .app-table-header-row-cell {
    order: 3;
    &:first-child {
      order: 1;
      width: auto;
      margin: 0;
    }
    &:last-child {
      width: auto;
      border: none;
      order: 2;
      margin-right: auto;
    }
  }
}

  .app-table-header-row-cell-title {
    display: block;
    font-weight: bold;
  }

  .app-table-header-row-cell-content {
    display: block;
  }

</style>
