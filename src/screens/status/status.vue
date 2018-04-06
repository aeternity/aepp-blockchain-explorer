<template>
  <div class="status-screen screen">
    <div v-if='s'>
      <h1>Status</h1>
      <p>
      Explorer connected to: <strong>{{node}}</strong>
      </p>
      <h2>Node and Peers</h2>
      <table>
        <tr>
          <th>address</th>
          <th>top.height</th>
          <th>top.hash </th>
          <th>top.time </th>
          <th>version.revision</th>
          <th>version.genesis_hash</th>
        </tr>
        <tr>
          <td><strong>{{node}}</strong></td>
          <td>{{s.nodeTop.height}}</td>
          <td>{{s.nodeTop.hash | startAndEnd }}</td>
          <td>{{s.nodeTop.time}}</td>
          <td>{{s.nodeVersion.revision | startAndEnd }}</td>
          <td>{{s.nodeVersion.genesis_hash | startAndEnd}}</td>
        </tr>
        <tr v-for='p in s.peers'>
          <td>{{p.address}}</td>
          <td>{{p.top.height}}</td>
          <td>{{p.top.hash | startAndEnd }}</td>
          <td>{{p.top.time}}</td>
          <td>{{p.version.revision | startAndEnd }}</td>
          <td>{{p.version.genesis_hash | startAndEnd}}</td>
        </tr>
      </table>
      <h1>Detail</h1>
      <h2>{{node}} </h2>
      <h3>version</h3>
      <pre>{{s.nodeVersion}}</pre>
      <h3>top</h3>
      <pre>{{s.nodeTop}}</pre>

      <h2>Peers</h2>
      <pre>{{s.peers}}</pre>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import pollAction from '@/mixins/pollAction'
export default {
  mixins: [pollAction('fetchNodeStatus')],
  data: () => ({
    node: process.env.AETERNITY_EPOCH_API_URL
  }),
  computed: mapState({
    s: 'nodeStatus'
  })
}
</script>
<style src='./status.scss' lang='scss' />
