<template>
  <span class="btn-wrap">
    <AeButton
      class="top-btn"
      face="icon"
      fill="primary"
      @click="goOnTop"
    >
      <AeIcon name="left-more" />
    </AeButton>
  </span>
</template>

<script>
import {
  AeButton,
  AeIcon
} from '@aeternity/aepp-components-3'

export default {
  name: 'BackToTop',
  components: {
    AeButton,
    AeIcon
  },
  data () {
    return {
      scrolled: 0
    }
  },
  methods: {
    goOnTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '../style/mixins';
  .btn-wrap {
    /deep/ .ae-button.primary {
      background-color: $magaenta;
    }

    /deep/ .ae-icon {
      transform: rotate(-90deg);
    }
  }
</style>
