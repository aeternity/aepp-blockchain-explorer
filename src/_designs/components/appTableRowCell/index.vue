<template>
  <div
    class="app-table-row-cell"
    :class="{ extend }"
  >
    <div
      v-if="$slots.title"
      class="app-table-row-cell-title"
    >
      <slot name="title" />
    </div>
    <div class="app-table-row-cell-content">
      <slot />
    </div>
  </div>
</template>
<script >
export default {
  name: 'AppTableRowCell',
  props: {
    extend: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@aeternity/aepp-components-3/src/styles/variables/colors";

.app-table-row-cell{
  display: block;
  width: 50%;
  padding: 0 .8rem;
  @media (max-width: 449px) {
      &:not(:last-child) {
      border-right: 2px solid $color-neutral-positive-2;
    }
  }

  @media (min-width: 450px) {
    padding: 0;
    width: 100%;
    display: flex;
    align-items: baseline;
    &:not(:last-child) {
      border-bottom: 2px solid $color-neutral-positive-2;
    }
  }
}

.app-table-row-cell.extend {
  width: 100%;
}

.app-table-row-cell-title {
  font-weight: bold;
  margin-bottom: .5rem;
  display: block;
  @media (min-width: 450px) {
    padding: 1rem .8rem;
    margin: 0;
    width:  30%;
    height: 100%;
    min-height: 100%;
    text-align: right;
    background-color: $color-neutral-positive-3;
    border-right: 2px solid $color-neutral-positive-2;
  }
}

.app-table-row-cell-content {
  @media (min-width: 450px) {
    display: block;
    padding-left: .8rem;
    width: 70%;
  }
}

</style>
