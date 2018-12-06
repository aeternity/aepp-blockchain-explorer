<template>
  <div>
    <network-name
      v-if="mode === ''"
      @click="mode = 'switcher'"
    />
    <ae-overlay
      v-else
      class="custom-overlay"
      @click="mode = ''"
    >
      <div class="networks-wrap">
        <div class="switcher-connection">
          <network-switcher
            v-if="mode === 'switcher'"
            @select-network="changeNetwork"
            @show-form="mode = 'form'"
          />
          <connection-form
            v-if="mode === 'form'"
            @select-network="changeNetwork"
            @close="mode = 'switcher'"
          />
          <error-item
            v-if="mode === 'error'"
            :name="tryOutNetwork.name"
            @try-again="changeNetwork(tryOutNetwork)"
            @cancel="mode = 'switcher'"
          />
          <loader-item
            v-if="mode === 'loader'"
            :name="tryOutNetwork.name"
          />
        </div>
      </div>
    </ae-overlay>
  </div>
</template>

<script>
import { AeOverlay } from '@aeternity/aepp-components-3'
import NetworkSwitcher from '../components/networkSwitcher'
import ConnectionForm from '../components/connectionForm'
import NetworkName from '../components/networkName'
import LoaderItem from './loaderItem'
import ErrorItem from './errorItem'

export default {
  name: 'network-wrap',
  components: {
    NetworkSwitcher,
    ConnectionForm,
    AeOverlay,
    NetworkName,
    LoaderItem,
    ErrorItem
  },
  data () {
    return {
      mode: '',
      tryOutNetwork: null
    }
  },
  methods: {
    async changeNetwork (network) {
      const initialUrl = this.$store.state.epochUrl
      this.tryOutNetwork = network
      const { name, url, isNew } = network
      this.mode = 'loader'
      this.$store.commit('changeNetworkUrl', url)
      try {
        await this.$store.getters.epochPromise
        this.$store.commit('blocks/resetState')
        this.$store.commit('accounts/resetState')
        this.$store.commit('transactions/resetState')

        await Promise.all([
          this.$store.dispatch('blocks/height')
            .then(() => this.$store.dispatch('blocks/getLatestGenerations', 10)),
          this.$store.dispatch('getNodeStatus')
        ])
      } catch (e) {
        this.mode = 'error'
        this.$store.commit('changeNetworkUrl', initialUrl)
        return
      }
      if (isNew) {
        this.$store.commit('addNetwork', { name, url })
      }
      this.mode = ''
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
