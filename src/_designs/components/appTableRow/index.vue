<template>
  <div
  class="app-table-row"
  :class="{
    extend
  }">
    <div class="app-table-row__title">
      <slot name="title"/>
    </div>
    <div class="app-table-row__text">
      <slot name="text"/>
    </div>
  </div>
</template>
<script >
  export default {
    name: 'AppTable',
    props: {
      /**
     * Extend the table row full width on mobile
     */
    extend: Boolean,
    }
  }
</script>
<style lang="scss" scoped>
@import '../../styles/index';
.app-table-row{
  background-color: $color-neutral-positive-3;
  position: relative;
  display: block;
  padding: .8rem;
  width: 50%;
  border-bottom: 2px solid $color-neutral-positive-2;
  &:first-child {
    border-top: 2px solid $color-neutral-positive-2;
  }
  &:nth-child(2n)::before{
    content: '';
    display: block;
    border-left: 2px solid $color-neutral-positive-2;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(-50%);
  }
  &__title {
    display: block;
    text-transform: uppercase;
    font-weight: bold;
    font-size: rem(11px);
    line-height: 1em;
    margin-bottom: .5rem;
    color: $color-neutral-negative-3;
  }

  &__text{
    font-size: rem(15px);
    line-height: 1.2em;
    color: $color-neutral-negative-1;
  }
}

.app-table-row.extend {
  width: 100%;
}
</style>
