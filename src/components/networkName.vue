<template>
  <span
    class='network-name network-name_switcher'
    @click="$emit('click')"
  >
    {{ currentNetwork.name }}
  </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['currentNetwork'])
}
</script>

<style lang="scss" scoped>
@import '../style/mixins.scss';

.network-name {
  text-transform:uppercase;
  position:fixed;
  top: 60px;
  right:20px;
  color: $white;
  @include font-size(xs);
  font-weight:500;
  padding:5px 7px;
  background: #F7296E;
  border-radius: 5px;
  @include only-phone {
    top: 60px;
  }

  &_switcher{
    cursor: pointer;
    padding:5px 25px;
    &:after{
      content: '';
      position: absolute;
      right: 5%;
      top: 28%;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 7px solid #e8e8e8;
      clear: both;
    }
  }

}
</style>
