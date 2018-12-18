<template>
  <div
    class="app-table"
    :class="{
      details
    }"
  >
    <slot />
  </div>
</template>
<script >
export default {
  name: 'AppTable',
  props: {
    /**
     * Extend the table row full width on mobile
     */
    details: Boolean
  }
}
</script>
<style lang="scss" scoped>
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";

  .app-table{
    display: flex;
    flex-direction: column
  }
  .app-table.details {
    background-color: $color-neutral-positive-3;
    @media  (min-width: 450px) {
      background-color: #FFFFFF;
    }
  }
</style>
