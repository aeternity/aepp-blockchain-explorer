<template>
  <div
    class="app-table-accordion"
    :class="type"
  >
    <button
      v-if="type === 'bottom'"
      class="app-table-accordion-button"
      @click="toggle"
    >
      {{ open ? 'hide micro block header' : 'show micro block header' }}
    </button>
    <Transition name="slide-fade">
      <div
        v-show="open"
        class="app-table-accordion-content"
      >
        <slot />
      </div>
    </Transition>
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
export default {
  name: 'AppTableAccordion',
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
  data: function () {
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
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "~@aeternity/aepp-components-3/src/styles/placeholders/typography";

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
      //box-shadow: inset 0px 10px 30px rgba(27,68,121,0.10);
    }
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all .3s linear;
    max-height: 300px;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    max-height: 0;
    opacity: 0;
  }
</style>
