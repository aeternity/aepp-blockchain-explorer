<template>
  <div class="app-table-body">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppTableBody'
}
</script>

<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  .app-table-body {
    display: flex;
    flex-wrap: wrap;
  }
</style>
