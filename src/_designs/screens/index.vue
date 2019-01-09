<template>
  <div
    id="blockchain"
    class="app"
  >
    <AppNav>
      <AppNavLink to="dashboard">
        Dashboard
      </AppNavLink>
      <AppNavLink to="generations">
        Generations
      </AppNavLink>
      <AppNavLink to="transactions">
        Transactions
      </AppNavLink>
    </AppNav>
    <RouterView />
  </div>
</template>
<script>
import AppNav from '@/_designs/components/appNav'
import AppNavLink from '@/_designs/components/appNavLink'

export default {
  name: 'App',
  components: {
    AppNav,
    AppNavLink
  }
}
</script>
<style lang="scss">
@import '../styles/index';
.app {}
</style>
