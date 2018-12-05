<template>
  <div>
    <span v-if="VUE_APP_SHOW_NETWORK_STATS"  class='network-name network-name_switcher'
          @click="showNetworkList">
      {{ networkName }}
    </span>
  </div>
</template>

<script>
import Networks from '../lib/networks'
export default {
  props: {
    name: String
  },
  data () {
    return {
      VUE_APP_SHOW_NETWORK_STATS: process.env.VUE_APP_SHOW_NETWORK_STATS
    }
  },
  computed: {
    networkName () {
      return !this.name ? Networks[0].name : this.name
    }
  },
  methods: {
    showNetworkList () {
      this.$emit('networks', true)
    }
  }
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
