<template>
  <header class="app-header">
    <AppMainNav />
    <div class="app-header-content">
      <div class="inner">
        <div class="searchbar">
          <SearchBar placeholder="Search by address / txhash / block / name.aet" />
        </div>
        <div class="network">
          <NetworkName />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AppMainNav from '@/_designs/partials/appMainNav'
import SearchBar from '@/_designs/components/searchBar'
import NetworkName from '@/_designs/components/networkName'
export default {
  name: 'AppHeader',
  components: {
    AppMainNav,
    SearchBar,
    NetworkName
  }
}
</script>

<style scoped lang="scss">
  @import "../../../node_modules/@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "../../../node_modules/@aeternity/aepp-components-3/src/styles/placeholders/typography";
.app-header {
  background-color: #D3DCE6;
  height: 30vh;
  margin-bottom: -20%;
  @media (min-width: 450px) {
    margin-bottom: -15%;
  }
  @media (min-width: 769px) {
    height: 50vh;
    margin-bottom: -10%;
    display: flex;
  }
  &-content {
    margin-left: auto;
    width: 80%;
    padding: 0 5%;
    @media (min-width:1080px) {
      width: 85%;
    }

  }
}
  .inner {
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    @media (min-width:769px) {
      margin-top: 3rem;
    }

    & .searchbar {
      width: 60%;
      max-width: 30rem;
      @media (max-width: 768px) {
        display: none;
      }
    }
    & .network {
      width: auto;
      margin-left: auto;
      @media (max-width:768px) {
        margin-right: -.7rem;
      }
      & .network {
        background-color: $color-primary;
        color: #FFFFFF;
        font-weight: bold;
        padding: .5rem;
        height: 2rem;
        border-radius: .4rem;
        @extend %face-uppercase-xs;
      }
    }
  }
</style>
