<template>
  <div class="app-table"
  :class="{
    details
  }">
    <slot/>
  </div>
</template>
<script >
  export default {
    name: 'AppTable',
    props: {
      /**
     * Extend the table row full width on mobile
     */
    details: Boolean,
    }
  }
</script>
<style lang="scss" scoped>
@import '../../styles/index';
  .app-table{
    @include xs {
      display: flex;
      flex-wrap: wrap;
    }
    background-color: $white;
    display: table;
    border-collapse: collapse;
    display: flex;
    flex-direction: column
  }
  .details {
    background-color: $color-neutral-positive-3;

    @include sm-lg {
      background-color: $white;
    }
  }
</style>
