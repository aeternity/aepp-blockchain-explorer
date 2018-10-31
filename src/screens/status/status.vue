<template>
  <div class="status-screen screen">
    <div>
      <h2>Change Connected Network</h2>
      <form @submit.prevent="changeNetwork">
        <ae-input placeholder="Network to connect to: " v-model="newNetworkUrl" @keyup.enter="changeNetwork"/>
        <ae-button
          type="exciting"
          size="medium"
        >
          connect
        </ae-button>
      </form>
      <template for="changing network">
        <h1>Status</h1>
        <p>Explorer connected to:
          <strong v-if="!isLoading">
            {{ node }}
          </strong>
          <fill-dummy color="grey" v-else/>
        </p>
        <h2>Node and Peers</h2>
        <table>
          <tr>
            <th>address</th>
            <th>top.height</th>
            <th>top.hash</th>
            <th>top.time</th>
            <th>version.revision</th>
            <th>version.genesis_KeyBlock_hash</th>
          </tr>
          <tr v-if="!isLoading">
            <td><strong>{{ node }}</strong></td>
            <td>{{ nodeStatus.top.keyBlock.height }}</td>
            <td>{{ nodeStatus.top.keyBlock.hash | startAndEnd }}</td>
            <td>{{ nodeStatus.top.keyBlock.time }}</td>
            <td>{{ nodeStatus.version.nodeRevision | startAndEnd }}</td>
            <td>{{ nodeStatus.version.genesisKeyBlockHash | startAndEnd }}</td>
          </tr>
          <tr v-else>
            <td><fill-dummy color="grey"/></td>
            <td><fill-dummy color="grey"/></td>
            <td><fill-dummy color="grey"/></td>
            <td><fill-dummy color="grey"/></td>
            <td><fill-dummy color="grey"/></td>
            <td><fill-dummy color="grey"/></td>
          </tr>
        </table>
        <h1>Detail</h1>
        <h2 v-if="!isLoading">
          {{ node }}
        </h2>
        <fill-dummy color="grey" size="big"/>
        <h3>version</h3>
        <pre v-if="!isLoading">
          {{ nodeStatus.version }}
        </pre>
        <div v-else>
          <div> <fill-dummy color="grey"/> </div>
          <div> <fill-dummy color="grey"/> </div>
          <div> <fill-dummy color="grey"/> </div>
        </div>

        <h3>top</h3>
        <pre v-if="!isLoading">
          {{ nodeStatus.top }}
        </pre>
        <div v-else>
          <div> <fill-dummy color="grey"/> </div>
          <div> <fill-dummy color="grey"/> </div>
          <div> <fill-dummy color="grey"/> </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import pollAction from '../../mixins/pollAction'
import {
  AeButton,
  AeInput
} from '@aeternity/aepp-components'
import FillDummy from '../../components/fillDummy'

export default {
  data: function () {
    return {
      newNetworkUrl: '',
      isNetworkChanging: false
    }
  },
  mixins: [pollAction('getNodeStatus')],
  computed: {
    ...mapState({
      nodeStatus: '$nodeStatus',
      node: 'epochUrl'
    }),
    isLoading () {
      return this.isNetworkChanging || !(this.nodeStatus.top && this.nodeStatus.version)
    }
  },
  components: {
    AeButton,
    AeInput,
    FillDummy
  },
  methods: {
    async changeNetwork () {
      this.isNetworkChanging = true
      this.$store.commit('changeNetworkUrl', this.newNetworkUrl)
      this.newNetworkUrl = ''
      this.$store.commit('blocks/resetState')
      this.$store.commit('accounts/resetState')
      this.$store.commit('transactions/resetState')

      await Promise.all([
        this.$store.dispatch('blocks/height'),
        this.$store.dispatch('getNodeStatus')
      ])
      this.isNetworkChanging = false
      this.$store.dispatch('blocks/getLatestGenerations', 10)
    }
  }
}
</script>
<style src='./status.scss' lang='scss' />
