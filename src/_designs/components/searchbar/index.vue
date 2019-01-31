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
      default: 'search'
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
    &-input {
      width: 540px;
      border-radius: 4px;
      border: none;
      padding: .7em 2.5em .7em .9em;
      color: $color-neutral-negative-1;
      @extend %face-mono-s;
    }

    &-button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 7px;

      .ae-icon {
        font-size: 22px;
      }
    }
  }
</style>
