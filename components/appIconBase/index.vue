<template>
  <svg
    :width="size"
    :height="size"
    :aria-labelledby="name"
    viewBox="0 0 24 24"
    class="app-icon"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    preserveAspectRatio="none"
  >
    <title
      :id="name"
      :text="name"
      lang="en"
    />
    <g :fill="fill">
      <AppIconCopy v-if="name === 'copy'" />
    </g>
  </svg>
</template>

<script>
import AppIconCopy from './appIcons/AppIconCopy'

export default {
  name: 'AppIconBase',
  components: {
    AppIconCopy
  },
  props: {
    name: {
      type: String,
      default: 'box'
    },
    size: {
      type: [Number, String],
      default: 18
    },
    fill: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
<style lang="scss" scoped>
  /*@import '../../styles/variables/colors';*/

  .app-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    color: inherit;
    overflow: visible;
  }

  .app-icon:before {
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    speak: none;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
