<template>
  <div
    class="app-table-accordion"
    :class="
      open ? 'open' : ''
    "
  >
    <button
      v-if="type === 'bottom'"
      class="app-table-accordion-button"
      @click="toggle"
    >
      {{ open ? 'hide micro block header' : 'show micro block header' }}
    </button>
    <TransitionExpand>
      <div
        v-show="open"
        class="app-table-accordion-content"
        :class="type"
      >
        <slot />
      </div>
    </TransitionExpand>
    <button
      v-if="type === 'top'"
      class="app-table-accordion-button"
      @click="toggle"
    >
      {{ open ? 'hide details' : 'show details' }}
    </button>
  </div>
</template>

<script>
import TransitionExpand from '@/_designs/components/transitionExpand'

export default {
  name: 'AppTableAccordion',
  components: {
    TransitionExpand
  },
  props: {
    type: {
      type: String,
      validator: value => [
        'top',
        'bottom'
      ].includes(value),
      default: 'top'
    }
  },
  data () {
    return { open: false }
  },
  methods: {
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../node_modules/@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "../../../node_modules/@aeternity/aepp-components-3/src/styles/placeholders/typography";

  .app-table-accordion {
    width: 100%;
    height: 100%;
    &-button {
      @extend %face-uppercase-xs;
      color: $color-neutral-negative-1;
      width: 100%;
      text-align: center;
      background-color: $color-neutral-positive-2;
      -webkit-appearance: none;
      border: none;
      padding: .6rem;
    }
  }
  .app-table-accordion.open .app-table-accordion-content {
    border-bottom: 2px solid $color-neutral-positive-2;
  }
</style>
