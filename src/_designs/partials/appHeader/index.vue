<template>
  <header class="app-header">
    <slot />
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  background-color: #001833;
}
</style>
