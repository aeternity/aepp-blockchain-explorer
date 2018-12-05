<template>
  <div>
    <network-name @networks="showNetworkSwitcher" :name="networkName"/>
    <ae-overlay class="custom-overlay" v-if="networkSwitcher"
                @click="closeNetworkSwitcher()">
      <div class="networks-wrap" >
        <div class="switcher-connection">
          <network-switcher class="switcher" :networkList="networkList" @form="showForm" @networkName="showName"  v-if="!connectionForm && isDisplaying"></network-switcher>
          <connection-form class="switcher-form"  @form="showForm" @networkName="showName"  v-if="connectionForm && isDisplaying"></connection-form>
          <error-item class="error" :name="networkName" :isFormOpened="connectionForm" @network="showNetworkSwitcher"  @form="showForm" v-if="connectError"></error-item>
          <loader-item :name="networkName" v-if="isLoading"></loader-item>
        </div>
      </div>
    </ae-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NetworkSwitcher from '../components/networkSwitcher'
import ConnectionForm from '../components/connectionForm'
import networkName from '../components/networkName'
import LoaderItem from './loaderItem'
import ErrorItem from './errorItem'
import Networks from '../lib/networks'
import {
  AeOverlay
} from '@aeternity/aepp-components-3'

export default {
  name: 'network-wrap',
  components: {
    NetworkSwitcher,
    ConnectionForm,
    AeOverlay,
    networkName,
    LoaderItem,
    ErrorItem
  },
  data () {
    return {
      networkList: Networks,
      networkSwitcher: false,
      connectionForm: false,
      networkName: ''
    }
  },
  computed: {
    ...mapState({
      isLoading: 'loading',
      connectError: 'error'
    }),
    isDisplaying () {
      return !this.isLoading && !this.connectError
    }
  },
  methods: {
    showNetworkSwitcher (event) {
      this.networkSwitcher = event
    },
    closeNetworkSwitcher () {
      this.networkSwitcher = false
      this.connectionForm = false
      this.$store.commit('clearError')
    },
    showForm (event) {
      this.connectionForm = event
    },
    showName (event) {
      this.networkName = event
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

    .switcher-connection {
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
