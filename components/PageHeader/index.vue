<template>
  <section class="app-page-header">
    <div class="app-page-header-container">
      <h1 class="app-page-header-title">
        {{ title }}
      </h1>
      <PageNav v-if="hasNav" />
    </div>
    <div class="app-page-header-container">
      <slot />
    </div>
  </section>
</template>
<script>
import PageNav from '../PageNav'
export default {
  name: 'PageHeader',
  components: {
    PageNav
  },
  props: {
    title: {
      type: String,
      required: true
    },
    hasNav: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "~@aeternity/aepp-components-3/src/styles/placeholders/typography";

    .app-page-header {
      background-color: transparent;
      margin: 0 -3rem;
      margin-bottom: -2.5rem;
      padding: .6rem 3rem 3rem;
      @media (min-width: 768px) {
        padding: .6rem 0;
        margin: 0;
      }
      &-title {
        font-size: 1.7rem;
        margin-bottom: 0;
        line-height: 1;
        text-transform: capitalize;
      }
      &-container {
        display: flex;
        justify-content: space-between;
      }
    }

</style>
