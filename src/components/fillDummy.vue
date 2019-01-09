<template>
  <div
    :class="[color, size]"
    class="fill-dummy"
  />
</template>

<script>
export default {
  name: 'FillDummy',
  props: {
    size: {
      type: String,
      default: 'normal'
    },
    color: {
      type: String,
      default: 'blue'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

.fill-dummy {
  display: inline-block;
  border-radius: 2px;
  margin: 5px 0 2px 5px;

  &.normal {
    width: 80px;
    height: 15px;

    &.grey {
      width: 120px;
      height: 18px;
    }
  }

  &.tall {
    width: 70px;
    height: 22px;
  }

  &.long {
    width: 162px;
    height: 15px;
  }

  &.small {
    width: 30px;
    height: 15px;
  }

  &.big {
    width: 250px;
    height: 25px;
  }

  @mixin pulse($name, $color) {
    @keyframes pulse-#{$name} {
      0% {
        background-color: rgba($color, 0.1);
      }
      50% {
        background-color: rgba($color, 0.3);
      }
      100% {
        background-color: rgba($color, 0.1);
      }
    }
  }

  &.blue {
    @include pulse(blue, $white);
    animation: pulse-blue 2s infinite ease-in-out;
  }

  &.grey {
    @include pulse(grey, #311B32);
    animation: pulse-grey 2s infinite ease-in-out;
  }
}
</style>
