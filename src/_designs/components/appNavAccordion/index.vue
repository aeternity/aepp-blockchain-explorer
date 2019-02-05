<template>
  <div
    class="app-nav-accordion"
    :class="
      openMenu ? 'open' : ''
    "
  >
    <button
      class="app-nav-accordion-btn"
      @click="toggleNav"
    >
      <AeIcon :name="icon" />
    </button>
    <div
      class="app-nav-accordion-content"
      @touchmove="prevent"
    >
      <button
        class="app-nav-accordion-btn close"
        @click="toggleNav"
      >
        <AeIcon name="close" />
      </button>
      <slot />
    </div>
  </div>
</template>
<script>
import { AeIcon } from '@aeternity/aepp-components-3'
export default {
  name: 'AppNavAccordion',
  components: {
    AeIcon
  },
  props: {
    icon: {
      type: String,
      default: 'burger'
    }
  },
  data () {
    return { openMenu: false }
  },
  methods: {
    toggleNav () {
      this.openMenu = !this.openMenu
    },
    prevent (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
</script>
<style scoped lang="scss">
    @import "../../../../node_modules/@aeternity/aepp-components-3/src/styles/variables/colors";
    .app-nav-accordion {
      position: relative;
      width: 2rem;
      height: 2rem;
      @media (min-width: 769px) {
        width: auto;
        height: auto;
        margin: auto 0;
        margin-left: -1rem;
      }
    }
    .app-nav-accordion-btn {
        color: #ffffff;
        font-size: 1.5rem;
        line-height: 0;
        padding: 0;
        background-color: transparent;
        border: none;
        @media (min-width: 769px) {
          display: none;
        }
      &.close {
        position: absolute;
        top: .8rem;
        right: 1.2rem;
      }
    }
    .app-nav-accordion-content {
      @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: auto 0;
      position: fixed;
      top: 0;
      left: 0;
      overflow: hidden;
      height: 100vh;
      width: 100%;
      z-index: 10;
      font-size: 1.7rem;
      background-color: $color-neutral-minimum;
      opacity: 0;
      transform: translateY(-200%);
      transition: all .3s ease-in-out;
      }
    }
    .open .app-nav-accordion-content {
        transform: translateY(-0%);
        opacity: 1;
        z-index: 10;
    }

</style>
