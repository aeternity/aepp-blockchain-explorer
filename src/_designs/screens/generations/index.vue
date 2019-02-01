<template>
  <div class="app-generation">
    <h1>App-Generations</h1>
    <Generations>
      <Generation :data="data" />
      <Generation :data="data" />
      <Generation :data="data" />
      <Generation :data="data" />
    </Generations>
    <div class="btn-container">
      <AeButton
        face="round"
        fill="neutral"
      >
        load more
      </AeButton>
    </div>
  </div>
</template>

<script>
import Generations from '@/_designs/components/generations'
import Generation from '@/_designs/components/generation'
import { AeButton } from '@aeternity/aepp-components-3'
const generationData = {
  'key_block': {
    'beneficiary': 'ak_542o93BKHiANzqNaFj6UurrJuDuxU61zCGr9LJCwtTUg34kWt',
    'hash': 'kh_bYoiQhCxsS8RNhbumWan7WVwRb9yqoYmK4fbpVaeK6QxdpGvW',
    'height': 29520,
    'miner': 'ak_9sX7cqm1juxd2CQ9KtoF4GUFbAMtz4K3rAkk8nZ1WjsrRaXVz',
    'nonce': 249211865583603,
    'pow': [
      15716933,
      21248494,
      31777385,
      51629097,
      52307438,
      60314379,
      77015848,
      111225783,
      129181552,
      132689424,
      137592480,
      147779189,
      157115594,
      159419405,
      196924597,
      224550827,
      247674216,
      255348542,
      259500283,
      273293538,
      274438493,
      291412994,
      293670763,
      302377574,
      303350137,
      312112679,
      334581844,
      336923970,
      336983229,
      354918023,
      355296365,
      376120031,
      392530749,
      423359953,
      435415471,
      438152264,
      441899177,
      448727944,
      491290085,
      500541757,
      530335760,
      531882689
    ],
    'prev_hash': 'kh_2QvUEsbG25JRApPGarpSZYootptdS8yrPa3AaABR2b5bTiyZVq',
    'prev_key_hash': 'kh_2QvUEsbG25JRApPGarpSZYootptdS8yrPa3AaABR2b5bTiyZVq',
    'state_hash': 'bs_jS1VPZyvoXggfUdQTGtVrpFTZdSRFgWhoHYJKecgbAp6cGeHZ',
    'target': 504509498,
    'time': 1548670493483,
    'version': 1,
    'transactions': 345,
    'total': 92300.10
  },
  'micro_blocks': []
}
export default {
  name: 'AppGenerations',
  components: {
    AeButton,
    Generations,
    Generation
  },
  data: function () {
    return {
      data: generationData
    }
  }
}
</script>

<style scoped>
.btn-container{
  padding: 10px 0;
  display: flex;
  justify-content: center;
}
</style>
