<template>
  <div class="load-more-button-wrapper">
    <AeButton
      face="round"
      fill="neutral"
      extend
    >
      Load More
    </AeButton>
  </div>
</template>
<script>
import { AeButton } from '@aeternity/aepp-components-3'

export default {
  name: 'LoadMoreButton',
  components: {
    AeButton
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  .load-more-button-wrapper {
    margin-top: 2rem;
    position: relative;
    min-height: 60px;
    &::after {
      content: "";
      display:block;
      position:absolute;
      width: 100%;
      left:0;
      top: 50%;
      border-bottom: 2px solid $color-neutral-positive-2;
    }
    .ae-button {
      max-width: 310px;
      min-width: 260px;
      position:absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      z-index: 20;
    }
  }
</style>
