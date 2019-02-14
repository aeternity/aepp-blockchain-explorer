<template>
  <div class="search-bar">
    <input
      :placeholder="placeholder"
      class="search-bar-input"
      type="text"
    >
    <button
      class="search-bar-button"
    >
      <no-ssr><AeIcon
        name="search"
      /></no-ssr>
    </button>
  </div>
</template>
<script>
let AeIcon
if (process.browser) {
  AeIcon = require('@aeternity/aepp-components-3').AeIcon
}

export default {
  name: 'SearchBar',
  components: {
    AeIcon
  },
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    }
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "~@aeternity/aepp-components-3/src/styles/placeholders/typography";
  .search-bar {
    display: inline-block;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #FFFFFF;
    border-radius: .4rem;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    &-input {
      width: 100%;
      border: none;
      padding: 1.3rem .6rem;
      color: $color-neutral-negative-1;
      @extend %face-sans-base;
    }

    &-button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      line-height: 0;
      padding: 1.3rem .6rem;
      .ae-icon {
        font-size: 1.5rem;
        color: $color-neutral-negative-1;
      }
    }
  }
</style>
