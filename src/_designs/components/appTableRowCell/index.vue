<template>
  <div class="app-table-row-cell" :class="{ extend }">
    <div class="app-table-row-cell__title">
      <slot name="title"/>
    </div>
    <div class="app-table-row-cell__content">
      <slot name="content"/>
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
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/index';

.app-table-row-cell{
  display: block;
  width: 50%;
  padding: 0 .8rem;

  @include sm-lg {
    display: table-row;
    border-bottom: 2px solid $color-neutral-positive-2;
    width: 100%;
  }

  &:not(.extend):first-child {
    @include xs {
      border-right: 2px solid $color-neutral-positive-2;
    }
  }
}

.app-table-row-cell__title {
  text-transform: uppercase;
  font-weight: bold;
  font-size: rem(12px);
  line-height: 1em;
  letter-spacing: 0.14em;
}

.app-table-row-cell__content {
  color: $color-neutral-negative-1;
}

.app-table-row-cell__title {
  margin-bottom: .5rem;
  display: block;
   @include sm-lg {
    padding:.8rem;
    margin: 0;
    width:  30%;
    text-align: right;
    display: table-cell;
    background-color: $color-neutral-positive-3;
    border-right: 2px solid $color-neutral-positive-2;
  }
}

.app-table-row-cell__content {
  word-break: break-word;
  @include sm-lg {
    display: table-cell;
    padding: .8rem;
  }
}

.app-table-row-cell.extend {
  width: 100%;
}

</style>
