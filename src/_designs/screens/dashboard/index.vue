<template>
  <div class="app-dashboard">
    <h1>App-Dashboard</h1>
    <GenerationDetails
      :data="generation"
      :dynamicdata="confirmations"
      :status="loading"
    />
  </div>
</template>
<script>
import GenerationDetails from '../../components/generationDetails'
let generation = { 'key_block': { 'beneficiary': 'ak_nv5B93FPzRHrGNmMdTDfGdd5xGZvep3MVSpJqzcQmMp59bBCv', 'hash': 'kh_Va2FsFXHt42RzdVzpTukjHHyVZ4MvSEL7EFx7sbr5fdczncAb', 'height': 26786, 'miner': 'ak_5rqwhQWfUZWJAJiznVNM8jFZHFeauMfHtRpJTpyKeMNiFkA7e', 'nonce': 1.6789561608775383e19, 'pow': [38472579, 46230368, 51512306, 68121257, 69412257, 91251449, 116650308, 136382081, 146501665, 174663127, 195370028, 197616641, 211590209, 213119874, 216245496, 217076105, 217287334, 277608555, 286558564, 293381078, 342303628, 366941486, 380556027, 381586470, 388872653, 394385994, 398582184, 403663819, 422706146, 423839089, 445781230, 455480767, 467163814, 471713947, 471899369, 479429173, 486919464, 495746344, 517065938, 518992932, 525417977, 528014605], 'prev_hash': 'kh_2vi7hJTFHKvujkACyH7DdLm12inPj3QrDgRVVRFoFqo444jvxH', 'prev_key_hash': 'kh_2vi7hJTFHKvujkACyH7DdLm12inPj3QrDgRVVRFoFqo444jvxH', 'state_hash': 'bs_2sFTApvBRkuHVCCf4wX75KM619MUJpC1TMHbzjgMJQJYz2JVC2', 'target': 503932105, 'time': 1548173309689, 'version': 1 }, 'micro_blocks': [] }
export default {
  name: 'AppDashboard',
  components: {
    GenerationDetails
  },
  data: function () {
    return {
      generation: generation,
      confirmations: null,
      loading: true
    }
  }
}
</script>
<style lang="scss">
.app-dashboard {}
</style>
