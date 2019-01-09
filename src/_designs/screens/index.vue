<template>
  <div
    id="blockchain"
    class="app"
  >
    <AppHeader>
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
    </AppHeader>
    <AppView>
      <RouterView />
    </AppView>
  </div>
</template>
<script>
import AppNav from '@/_designs/components/appNav'
import AppNavLink from '@/_designs/components/appNavLink'
import AppHeader from '@/_designs/partials/appHeader'
import AppView from '@/_designs/partials/appView'

export default {
  name: 'App',
  components: {
    AppNav,
    AppNavLink,
    AppHeader,
    AppView
  }
}
</script>
<style lang="scss">
@import '../styles/index';
.app {
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
</style>
