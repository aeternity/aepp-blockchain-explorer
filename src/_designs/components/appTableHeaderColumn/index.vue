<template>
  <div class="app-table-header-column">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppTableHeaderColumn'
}
</script>

<style scoped lang="scss">
  .app-table-header-column {
    display: flex;
    flex-direction: column;
    width: 50%;
  @media (min-width: 1600px) {
    width: 25%;
  }
  }
  .app-table-header-column:first-child {
   width: 50%
  }
</style>
