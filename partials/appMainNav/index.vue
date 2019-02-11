<template>
  <div class="app-main-nav">
    <div class="app-main-nav-logo">
      <Logo fill="primary" />
    </div>
    <div class="app-main-nav-mobile">
      <AppNavAccordion icon="search">
        <div class="mobile-search">
          <SearchBar />
          <AeText face="sans-xs">
            Search by address / txhash / block / name.aet
          </AeText>
        </div>
      </AppNavAccordion>
    </div>
    <AppNavAccordion>
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
    </AppNavAccordion>
  </div>
</template>

<script>
import Logo from '@/_designs/components/logo'
import { AeText } from '@aeternity/aepp-components-3'
import AppNavAccordion from '@/_designs/components/appNavAccordion'
import SearchBar from '@/_designs/components/searchBar'
import AppNav from '@/_designs/components/appNav'
import AppNavLink from '@/_designs/components/appNavLink'

export default {
  name: 'AppMainNav',
  components: {
    AppNavAccordion,
    AppNav,
    AppNavLink,
    SearchBar,
    AeText,
    Logo
  }
}
</script>

<style scoped lang="scss">
  @import "../../../node_modules/@aeternity/aepp-components-3/src/styles/variables/colors";
  .app-main-nav {
    min-height: 3rem;
    display: flex;
    position: relative;
    background-color: #001833;
    color: #FFFFFF;
    padding: .8rem;
    justify-content: space-between;
    @media (min-width: 769px) {
      flex-direction: column;
      justify-content: space-between;
      padding-left: 1rem;
      min-width: 12rem;
      width: 20%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
    }
    @media (min-width: 1040px) {
      width: 15%;
    }
  }
  .app-main-nav-mobile {
    display: flex;
    @media (min-width: 769px) {
      display: none;
    }
  }
  .app-main-nav-logo{
    width: 100%;
    margin-right: auto;
  }
  .mobile-search {
    padding: 1.5rem;
    & > .ae-text{
      margin-top: 1rem;
      color: $color-neutral-negative-1;
    }
  }
</style>
