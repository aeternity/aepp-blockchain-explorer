<template>
  <RouterLink
    :to="to"
    class="app-nav-link"
    active-class="active"
    exact
  >
    <slot />
  </RouterLink>
</template>

<script>
export default {
  name: 'AppNavLink',
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
 .app-nav-link {
   color: #76818C;
   line-height: 1.9em;
 }
</style>
