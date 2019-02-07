<template>
  <nav
    class="page-nav"
  >
    <ul class="page-nav-list">
      <li class="page-nav-list-item prev">
        <span class="visually-hidden">
          previous page
        </span>
        <AeIcon name="back" />
      </li>
      <li class="page-nav-list-item next">
        <span class="visually-hidden">
          next page
        </span>
        <AeIcon name="back" />
      </li>
    </ul>
  </nav>
</template>
<script>
import { AeIcon } from '@aeternity/aepp-components-3'
export default {
  name: 'PageNav',
  components: {
    AeIcon
  }
}
</script>
<style lang="scss" scoped>
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "~@aeternity/aepp-components-3/src/styles/placeholders/typography";
  .page-nav {
    display: flex;
    align-items: center;
    &-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      &-item {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        & .ae-icon {
          color: $color-neutral-negative-3;
        }
        &.prev {
          margin-right: 1rem;
        }
        &.next > .ae-icon {
          transform: rotate(180deg);
        }
      }
    }
  }
  .visually-hidden {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    padding:0 !important;
    border:0 !important;
    height: 1px !important;
    width: 1px !important;
    overflow: hidden;
  }
</style>
