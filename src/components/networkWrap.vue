<template>
    <ae-overlay class="custom-overlay" v-if="networkSwitcher"
                @click="closeNetworkSwitcher()">
      <div class="networks-wrap" >
        <network-switcher class="switcher" :networkList="networkList"  v-if="!connectionForm"></network-switcher>
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
  data () {
    return {
      networkList: [
        {
          name: 'Roma',
          url: 'https://sdk-mainnet.aepps.com/',
          isLocal: false
        },
        {
          name: 'sdk-edgenet.aepps',
          url: 'https://sdk-edgenet.aepps.com/',
          isLocal: false
        },
        {
          name: 'sdk-testnet.aepps',
          url: 'https://sdk-testnet.aepps.com/',
          isLocal: false
        }
      ]
    }
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
      this.$store.commit('clearError')
    }
  }
}
</script>
<style scoped lang='scss'>
  @import '../../src/style/mixins';
  .custom-overlay.ae-overlay {
    background-image: linear-gradient(to bottom, rgba(237, 243, 247, 0.8), rgba(237, 243, 247, 0.8));
  }

  .networks-wrap{
    max-width: 1040px;
    width: calc(100% - 40px);
    margin: 0 auto;
    position: relative;

    .switcher, .switcher-form {
      min-width: 312px;
      position: absolute;
      top: 55px;
      right: 0;

      @include only-phone{
        right: 0;
        left: 0;
        top: 110px;
        margin: 0 auto;
        width: 320px;
      }
    }
  }
</style>
