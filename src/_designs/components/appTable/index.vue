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
  .app-table{
    display: flex;
    flex-direction: column
  }
</style>
