<template>
  <div
  class="app-table-row-cell"
  :class="{
    extend
  }">
    <div class="title">
      {{ title }}
    </div>
    <div class="text">
      <slot name="text"/>
    </div>
  </div>
</template>
<script >
  export default {
    name: 'AppTableRowCell',
    props: {
      title: String,
       /**
       * Extend the table row full width on mobile
       */
      extend: Boolean
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
      &:nth-child(2n) {
        border-top: 2px solid $color-neutral-positive-2;
        border-bottom: 2px solid $color-neutral-positive-2;
      }
      width: 100%;
    }
  &:not(.extend):nth-child(1) {
    @include xs {
      border-right: 2px solid $color-neutral-positive-2;
    }
  }
}
.extend {
  width: 100%;
}
.title {
  margin-bottom: .5rem;
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
.text {
  @include sm-lg {
    display: table-cell;
    padding: .8rem;
  }
}


.title {
  text-transform: uppercase;
  font-weight: bold;
  font-size: rem(11px);
  line-height: 1em;
  letter-spacing: 0.14em;
}

.text {
  font-size: rem(15px);
  line-height: 1.2em;
  color: $color-neutral-negative-1;
}

</style>
