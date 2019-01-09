<template>
  <div class="app-view">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'AppView'
}
</script>
<style lang="scss">
  .app-view {
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (min-width: 768px) {
      width: 85%;
    }
  }
</style>
