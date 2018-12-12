<template>
  <span class="btn-wrap" v-if="showing">
    <ae-button class="top-btn" face="icon" fill="primary"  @click="goOnTop">
      <ae-icon name="share" />
    </ae-button>
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
  props: {
    showing: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      scrolled: 0
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    goOnTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    handleScroll () {
      this.scrolled = window.scrollY
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
  }
</style>
