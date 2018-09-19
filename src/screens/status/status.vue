<template>
  <div class="status-screen screen">
    <div v-if='nodeStatus.top && nodeStatus.version'>
      <h2>Change Connected Network</h2>
      <form @submit.prevent="changeNetwork">
        <ae-input placeholder="Network to connect to: " v-model="newNetworkName" @keyup.enter="changeNetwork"/>
        <ae-button
          type="exciting"
          size="medium"
        >
          connect
        </ae-button>
      </form>
      <v-wait for="changing network">
        <template slot='waiting'>
          <spinner message="Loading... Please wait" />
        </template>
        <h1>Status</h1>
        <p>Explorer connected to: <strong>{{ node }}</strong></p>
        <h2>Node and Peers</h2>
        <table>
          <tr>
            <th>address</th>
            <th>top.height</th>
            <th>top.hash</th>
            <th>top.time</th>
            <th>version.revision</th>
            <th>version.genesis_hash</th>
          </tr>
          <tr>
            <td><strong>{{ node }}</strong></td>
            <td>{{ nodeStatus.top.height }}</td>
            <td>{{ nodeStatus.top.hash | startAndEnd }}</td>
            <td>{{ nodeStatus.top.time }}</td>
            <td>{{ nodeStatus.version.revision | startAndEnd }}</td>
            <td>{{ nodeStatus.version.genesisHash | startAndEnd }}</td>
          </tr>
        </table>
        <h1>Detail</h1>
        <h2>{{ node }} </h2>
        <h3>version</h3>
        <pre>{{ nodeStatus.version }}</pre>
        <h3>top</h3>
        <pre>{{ nodeStatus.top }}</pre>
      </v-wait>
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
import Spinner from 'vue-simple-spinner'

export default {
  data: function () {
    return { newNetworkName: '' }
  },
  mixins: [pollAction('getNodeStatus')],
  computed: {
    ...mapState({
      nodeStatus: '$nodeStatus'
    }),
    node: function () {
      return this.$store.state.baseUrl
    }
  },
  components: {
    AeButton,
    AeInput,
    Spinner
  },
  methods: {
    changeNetwork () {
      this.$store.commit('changeNetwork', this.newNetworkName)
      this.newNetworkName = ''
    }
  }
}
</script>
<style src='./status.scss' lang='scss' />
