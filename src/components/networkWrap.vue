<template>
    <ae-overlay class="custom-overlay" v-if="networkSwitcher"
                @click="closeNetworkSwitcher()">
      <div class="networks-wrap" >
        <network-switcher class="switcher"  v-if="!connectionForm"></network-switcher>
        <connection-form class="switcher-form" v-if="connectionForm"></connection-form>
      </div>
    </ae-overlay>
</template>

<script>
import { mapState } from 'vuex'
import NetworkSwitcher from '../components/networkSwitcher'
import ConnectionForm from '../components/connectionForm'
import {
    AeOverlay
} from '@aeternity/aepp-components-3'

export default {
  name: 'network-wrap',
  components: {
    NetworkSwitcher,
    ConnectionForm,
    AeOverlay
  },
  computed: {
    ...mapState({
      networkSwitcher: 'isNetworkSwitcher',
      connectionForm: 'isConnectForm'
    })
  },
  methods: {
    closeNetworkSwitcher () {
      this.$store.commit('closeNetworkList')
    }
  }
}
</script>
<style scoped lang='scss'>
  @import '../../src/style/mixins';
  .networks-wrap{
    max-width: 1040px;
    width: calc(100% - 40px);
    margin: 0 auto;
    position: relative;

    .switcher{
      min-width: 312px;
      position: absolute;
      top: 55px;
      right: 0;

      @include only-phone{
        right: 0;
        left: 0;
        margin: 0 auto;
      }
    }

    .switcher-form{
      min-width: 312px;
      position: absolute;
      top: 55px;
      right: 0;

      @include only-phone{
        right: 0;
        left: 0;
        margin: 0 auto;
      }
    }
  }
</style>


