<template>
  <ae-card class="network-switcher">
    <ae-list face="primary" v-if="isDisplaying ">
      <div class="network-item"
           v-for="(network, index) in collectedNetworks" :key="index" :class="{localnetwork: network.isLocal}">
        <ae-list-item >
          <ae-dropdown direction="left" v-if="network.isLocal">
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
      <error-item class="error" :name="networkName" :onTryAgain="showNetwork"  :onCancel="closeNetwork"  v-if="connectError"></error-item>
      <loader-item :name="networkName"  v-if="isLoading" ></loader-item>
    </div>
    <ae-toolbar slot="footer"  v-if="isDisplaying ">
      <ae-button class="network-info__connect" face="flat" @click="showForm()">Connect to other network</ae-button>
    </ae-toolbar>
  </ae-card>
</template>

<script>

import { mapState } from 'vuex'
import LoaderItem from './loaderItem'
import ErrorItem from './errorItem'

import {
  AeCard,
  AeList,
  AeListItem,
  AeCheck,
  AeToolbar,
  AeButton,
  AeDropdown,
  AeIcon
} from '@aeternity/aepp-components-3'

export default {
  name: 'network-switcher',
  components: {
    AeCard,
    AeList,
    AeListItem,
    AeCheck,
    AeToolbar,
    AeButton,
    AeDropdown,
    AeIcon,
    LoaderItem,
    ErrorItem
  },
  data () {
    return {
      networkUrl: this.$store.state.epochUrl,
      networkName: undefined
    }
  },
  methods: {
    async changeNetwork () {
      await this.$store.dispatch('changeNetwork', this.networkUrl)
      this.networkUrl = this.url
    },
    catchNetworkName (name, url) {
      this.networkName = name
      this.networkUrl = url
      this.changeNetwork()
    },
    showNetwork () {
      this.$store.commit('clearError')
    },
    closeNetwork () {
      this.$store.commit('clearError')
      this.$store.commit('closeNetworkList')
    },
    showForm () {
      this.$store.commit('showForm')
    }
  },
  computed: {
    ...mapState({
      networks: 'networkList',
      localNetworks: 'localNetworkList',
      url: 'epochUrl',
      isLoading: 'loading',
      connectError: 'error'
    }),
    collectedNetworks () {
      return this.networks.concat(this.localNetworks)
    },
    isDisplaying () {
      return !this.isLoading && !this.connectError
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

.ae-loader{
  margin: 0;
}

.network-switcher{
  max-width: 320px;

  > /deep/ .ae-card-main{
    padding: 0;
    flex-direction: column;
    align-items: center;

    .ae-list{
      width: 100%;
      box-sizing: border-box;
      padding: 0;
      overflow: visible;

      .ae-list-item{
        padding: 20px 0 16px;
      }
    }
  }

  & /deep/.ae-check-button{
    min-width: 36px;
    padding-left: 0;
  }

  .network-item{
    padding: 0 15px;
  }

  /deep/ .localnetwork{
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
