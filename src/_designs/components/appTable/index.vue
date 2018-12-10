<template>
  <div class="app-table">
    <slot/>
  </div>
</template>
<script >
  export default {
    name: 'AppTable'
  }
</script>
<style lang="scss" scoped>
  .app-table{
    display: flex;
    flex-wrap: wrap;

  }
</style>
