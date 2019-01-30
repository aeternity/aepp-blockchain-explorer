<template>
  <RouterLink
    class="logo"
    to="/"
  >
    <div class="app-nav-logo">
      <div class="graphics">
        <img
          class="logo"
          src="../../../assets/logo.svg"
          alt="logo"
        >
      </div>
      <span class="bold">
        æternity
      </span>explorer
    </div>
  </RouterLink>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    fill: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../../style/mixins';
  .app-nav-logo {
    display: flex;
    align-items: center;
    font-size: .9rem;
    color: white;
    & .graphics {
      background-color: $aubergin;
      display: block;
      width: 2em;
      height: 2em;
      margin-right: .5rem;
      border-radius: 50%;
      text-align: center;
      @media (min-width: 450px) {
        background-color: $aubergineLight;
      }
    }
    & .bold {
      font-weight: bold;
    }

    .logo {
      max-width: 82%;
      height: 2em;
    }
  }
</style>
