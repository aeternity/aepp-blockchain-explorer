<template>
  <header class="app-header">
    <AppNav>
      <!--<AppNavLink to="generations">-->
        <!--Generations-->
      <!--</AppNavLink>-->
      <!--<AppNavLink to="transactions">-->
        <!--Transactions-->
      <!--</AppNavLink>-->
    </AppNav>
  </header>
</template>

<script>
  import AppNav from '@/_designs/partials/appNav'
  import AppNavLink from '@/_designs/components/appNavLink'
export default {
  name: 'AppHeader',
  components: {
    AppNav,
    AppNavLink
  }
}
</script>

<style scoped lang="scss">
.app-header {
  background-color: #D3DCE6;
  height: 30vh;
  margin-bottom: -20%;
  grid-area: header;
  @media (min-width: 450px) {
    margin-bottom: -15%;
  }
  @media (min-width: 769px) {
    height: 50vh;
    margin-bottom: -10%;
  }
}
</style>
