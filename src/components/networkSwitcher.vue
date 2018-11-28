<template>
  <div class="contract-code">
    <ae-card class="network-switcher">
      <ae-list face="primary" v-if="isDisplaying ">
        <div class="network-item"
             v-for="(network, index) in collectedNetworks" :key="index"
        v-bind:class="{localnetwork: index >= serverNetworks.length}">
          <ae-list-item >
            <ae-dropdown direction="left" v-if="index >= serverNetworks.length">
              <ae-icon name="more" size="20px" slot="button" />
              <li>
                <ae-icon name="copy" />
                Copy Link
              </li>
              <li>
                <ae-button>
                  <ae-icon name="delete" />
                  Delete
                </ae-button>
              </li>
            </ae-dropdown>
            <div class="network-info">
              <div class="network-info__name">
                {{network.name}}
              </div>
              <div class="network-info__url">
                {{network.url}}
              </div>
            </div><ae-check class="network-switcher__action"
                            v-model="networkUrl"
                            :value="network.url"
                            type="radio"
                            @change="catchNetworkName(network.name, network.url)"/>
          </ae-list-item>
        </div>
      </ae-list>
      <div class="hendler-wrapper">
        <error :name="networkName"  @back="closeError" @closeNetwork="showNetworkList"  v-if="isError"></error>
        <loader-item :name="networkName"  v-if="isNetworkChanging" ></loader-item>
      </div>
      <ae-toolbar slot="footer"  v-if="isDisplaying ">
        <ae-button class="network-info__connect" face="flat" @click="showForm()">Connect to other network</ae-button>
      </ae-toolbar>
    </ae-card>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import {
  AeModal
} from '@aeternity/aepp-components'
import LoaderItem from './loaderItem'
import Error from './error'

import {
  AeCard,
  AeList,
  AeListItem,
  AeCheck,
  AeToolbar,
  AeButton,
  AeDivider,
  AeDropdown,
  AeIcon,
  AeLoader,
  AeFilterSeparator,
  AePanel,
  AeInput
} from '@aeternity/aepp-components-3'

export default {
  name: 'network-switcher',
  components: {
    AeModal,
    AeCard,
    AeList,
    AeListItem,
    AeCheck,
    AeToolbar,
    AeButton,
    AeDivider,
    AeDropdown,
    AeIcon,
    AeLoader,
    AeFilterSeparator,
    AePanel,
    AeInput,
    LoaderItem,
    Error
  },
  data () {
    return {
      view: null,
      modalVisible: false,
      networkUrl: this.$store.state.epochUrl,
      networkName: undefined,
      serverNetworks: [
        {
          name: 'sdk-edgenet.aepps',
          url: 'https://sdk-edgenet.aepps.com/'
        },
        {
          name: 'test-net-api.aepps',
          url: 'https://test-net-api.aepps.com/'
        }
      ],
      isNetworkChanging: false,
      isError: false
    }
  },
  methods: {
    closeError (e) {
      this.isError = e
    },
    showNetworkList (isVisible) {
      this.$emit('showList', isVisible)
    },
    async changeNetwork () {
      this.isNetworkChanging = true
      this.$store.commit('changeNetworkUrl', this.networkUrl)
      this.$store.commit('blocks/resetState')
      this.$store.commit('accounts/resetState')
      this.$store.commit('transactions/resetState')

      await Promise.all([
        this.$store.dispatch('blocks/height'),
        this.$store.dispatch('getNodeStatus')
      ]).then(success => {
        this.$store.commit('clearError')
        this.showNetworkList(false)
      }).catch(err => {
        this.isError = true
        this.isNetworkChanging = false
        this.$store.commit('catchError', err)
      })

      this.$store.dispatch('blocks/getLatestGenerations', 10)

      if (this.connectError.length) {
        this.isError = true
      }
      this.isNetworkChanging = false
    },
    catchNetworkName (name, url) {
      this.networkName = name
      this.networkUrl = url
      this.changeNetwork()
    },
    showForm () {
      this.$emit('showForm', true)
    }
  },
  computed: {
    ...mapState({
      connectError: 'error'
    }),
    collectedNetworks () {
      if (localStorage.getItem('localNetwork')) {
        return this.serverNetworks.concat(JSON.parse(localStorage.getItem('localNetwork')))
      } else {
        return this.serverNetworks
      }
    },
    isDisplaying () {
      return !this.isNetworkChanging && !this.isError
    }
  }
}
</script>

<style lang="scss">
  @import '../style/variables';
  .network-switcher{

    &> .ae-card-main{
      padding: 0!important;
      flex-direction: column!important;
      align-items: center!important;
    }

    .ae-list{
      width: 100% !important;
      box-sizing: border-box!important;
      padding: 0!important;
      overflow: visible!important;

      .ae-list-item{
        padding: 20px 0 16px!important;
      }
    }

    .network-item{
      padding: 0 15px;
    }

    .localnetwork{
      background-color: $paleGrey;

      .ae-list-item{
        justify-content: flex-start;

        .ae-check{
          margin-left: auto;
        }

        .ae-dropdown-button{
          justify-content: flex-start;
          i{
            margin-left: -6px;
          }
        }
      }
    }

    .ae-check-button{
      min-width: 36px!important;
      padding-left: 0!important;
    }
  }
</style>

<style lang="scss" scoped>
@import '../style/variables';

.ae-loader{
  margin: 0;
}

.network-switcher{
  max-width: 320px;

  .hendler-wrapper{
    width: 100%;
  }
  .network-info{

    &__name{
      font-size: 15px;
      line-height: 20px;
      letter-spacing: 0;
      color: #203040;
    }
    &__url{
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 0;
      color: $darkGrey;
    }
    &__connect{
      color: $darkGrey;
    }
  }

}
</style>
