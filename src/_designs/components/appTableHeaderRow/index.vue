<template>
  <div
    class="app-table-header-row"
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
  name: 'AppTableHeaderRow',
  props: {
    extend: Boolean,
    nested: Boolean,
    reorder: Boolean
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";

  .app-table-header-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: baseline;
    padding-top: .8rem;

    &:not(:last-child) {
      border-bottom: 2px solid $color-neutral-positive-2;
      padding-bottom: .8rem;
    }
  }

  .app-table-header-row {
    &.nested {
      width: 50%;
      border-left: 2px solid $color-neutral-positive-2;
      border-bottom: none;
      margin-bottom: .6rem;
      padding: 0;
      @media (min-width: 450px) {
        margin-bottom: 0;
      }
      @media (min-width: 1600px) {
        width: 25%;
      }

      &.extend {
        padding-top: .6rem;
        margin-bottom: 0;
        border-left: none;
        border-top: 2px solid $color-neutral-positive-2;
        @media (min-width: 450px) {
          padding-top: 0;
          border-left: 2px solid $color-neutral-positive-2;
        }
        @media (min-width: 1600px) {
          border-top: none;
        }
      }
    }
  }

  .app-table-header-row.extend {
    width: 100%;
    @media (min-width: 450px) {
      width: 50%;
    }

    &.nested {
      @media (min-width: 450px) {
        width: 50%;
      }
      @media (min-width: 1600px) {
        width: 25%;
      }
    }
  }
  .app-table-header-row.reorder {
    @media (min-width: 450px) {
      justify-content: flex-start;
    }
  }
  .app-table-header-column  > .app-table-header-row.nested {
    width: 100%;
  }
</style>
