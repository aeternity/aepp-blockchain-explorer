<template>
  <div class="search-bar">
    <input
      class="search-bar-input"
      :placeholder="placeholder"
      type="text"
    >
    <button
      class="search-bar-button"
    >
      <AeIcon
        name="search"
      />
    </button>
  </div>
</template>
<script>
import { AeIcon } from '@aeternity/aepp-components-3'

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
  @import "../../../node_modules/@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "../../../node_modules/@aeternity/aepp-components-3/src/styles/placeholders/typography";
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
