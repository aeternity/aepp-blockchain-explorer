<template>
  <div>
    <!--<span v-if="VUE_APP_SHOW_NETWORK_STATS" is="router-link" to="/status/" class='network-name'>-->
      <!--{{ networkName }}-->
    <!--</span>-->
    <span v-if="VUE_APP_SHOW_NETWORK_STATS"  class='network-name network-name_swither'
          @click="showNetworkList(true)">
      {{ networkName }}
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      VUE_APP_SHOW_NETWORK_STATS: process.env.VUE_APP_SHOW_NETWORK_STATS
    }
  },
  computed: {
    networkName () {
      let url = this.$store.state.epochUrl
      let name = url.replace(/(?:http(?:s)?:)?\/\/([^.]+).*/, '$1')
      if (name) {
        let shortname = name.replace(/([^.]+)-net-api/, '$1')
        if (shortname) {
          return `${shortname} network`
        }
        return name
      }
      return url
    }
  },
  methods: {
    showNetworkList () {
      this.$emit('showList', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/mixins.scss';

.network-name {
  text-transform:uppercase;
  position:fixed;
  top: 30px;
  right:20px;
  color: $white;
  @include font-size(xs);
  font-weight:500;
  padding:5px 7px;
  background: #F7296E;
  border-radius: 5px;

  &_swither{
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
