<template>
  <div class="account-group">
    <slot />
  </div>
</template>
<script>

export default {
  name: 'AccountGroup'
}
</script>
<style scoped lang="scss">

    .account-group {
        & .account:first-child {
          position: relative;
          &:after {
            content: '';
            width: 8px;
            height: 8px;
            background-image: url('./triangle.svg');
            background-repeat: no-repeat;
            position: absolute;
            bottom: -6px;
            left: 1.35rem;
          }
        }
    }
  .account-group > .account {
    @media (max-width: 450px) {
      flex-direction: row;
    }
  }
</style>
