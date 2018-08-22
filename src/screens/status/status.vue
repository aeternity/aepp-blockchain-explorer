<template>
  <div class="status-screen screen">
    <div v-if='nodeStatus.top && nodeStatus.version'>
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
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import polling from '../../functions/polling'

/*
 * Creating polling instance
 */
const poll = polling()

export default {
  /*
   * Component data
   */
  data: function () {
    return { node: process.env.VUE_APP_EPOCH_URL }
  },

  /*
   * Computed Properties
   */
  computed: mapState({
    nodeStatus: '$nodeStatus'
  }),

  /*
   * Before and After route events
   */
  beforeRouteEnter (to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    return next((vm) => poll.fetch.call(vm, 'getNodeStatus'))
  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    return poll.close('getNodeStatus', () => next())
  }
}
</script>
<style src='./status.scss' lang='scss' />
