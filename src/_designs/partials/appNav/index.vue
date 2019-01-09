<template>
  <div class="app-nav">
    <div class="app-nav-logo">
      <div class="graphics" />
      <span class="bold">
        æternity
      </span>explorer
    </div>
    <nav class="app-nav-links">
      <slot />
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppNav'
}
</script>

<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  .app-nav {
    min-height: 3rem;
    display: flex;
    background-color: #001833;
    color: #FFFFFF;
    padding: .8rem;
    @media (min-width: 450px) {
      padding: .8rem 2rem;
    }
    @media (min-width: 769px) {
      flex-direction: column;
      justify-content: space-between;
      padding: 1rem;
      min-width: 8em;
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

  .app-nav-links {
    margin: auto 0;
    display: none;
    @media (min-width: 769px) {
      display: flex;
      flex-direction: column;
    }
  }

  .app-nav-logo{
    display: flex;
    align-items: center;
    font-size: .9rem;
    & .graphics {
      background-color: #F7296E;
      display: block;
      width: 2em;
      height: 2em;
      margin-right: .5rem;
      border-radius: 50%;
    }
    & .bold {
      font-weight: bold;
    }
  }
</style>
