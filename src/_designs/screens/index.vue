<template>
  <div
    id="blockchain"
    class="app"
  >
    <AppHeader />
    <AppView>
      <RouterView />
    </AppView>
  </div>
</template>
<script>

import AppHeader from '@/_designs/partials/appHeader'
import AppView from '@/_designs/partials/appView'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppView
  }
}
</script>
<style lang="scss">
@import '../styles/index';
.app {
  background-color: #F7FAFC;
  padding-bottom: 2rem;
}
  h1 {
    font-size: 1.2rem;
    margin-top: 0;
    font-weight: normal;
  }
</style>
