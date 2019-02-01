<template>
  <nav class="breadcrumbs">
    <ul class="breadcrumbs-list">
      <li class="breadcrumbs-list-item">
        root
      </li>
      <li class="breadcrumbs-list-item">
        page
      </li>
      <li class="breadcrumbs-list-item active">
        subpage
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'BreadCrumbs'
}
</script>
<style lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "~@aeternity/aepp-components-3/src/styles/placeholders/typography";

    .breadcrumbs {
      width: 100%;
      padding: .3rem 0;

      &-list {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;

          &-item {
            text-transform: capitalize;
            @extend %face-sans-s;
            &:not(:last-child) {
              &:after {
                content: '>';
                text-align: center;
                margin: 0 .25rem;
              }
            }
            &.active {
              color: $color-neutral-negative-1;
            }
          }
      }
    }
</style>
