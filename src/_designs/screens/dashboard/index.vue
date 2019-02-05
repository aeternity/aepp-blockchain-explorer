<template>
  <div class="app-dashboard">
    <PageHeader title="Dashboard">
      <BreadCrumbs />
    </PageHeader>
    <GenerationDetails
      :data="generation"
      :dynamic-data="confirmations"
    />
    <MicroBlocks>
      <MicroBlock :data="generation">
        <Generation :data="generation" />
        <Generation :data="generation" />
      </MicroBlock>
      <MicroBlock :data="generation">
        <Generations>
          <Generation :data="generation" />
          <Generation :data="generation" />
        </Generations>
      </MicroBlock>
    </MicroBlocks>
  </div>
</template>
<script>
import GenerationDetails from '@/_designs/components/generationDetails'
import MicroBlocks from '@/_designs/components/microBlocks'
import MicroBlock from '@/_designs/components/microBlock'
import Generations from '@/_designs/components/generations'
import Generation from '@/_designs/components/generation'
import PageHeader from '@/_designs/components/PageHeader'
import BreadCrumbs from '@/_designs/components/BreadCrumbs'

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
    'total': 92300.10,
    'reward': 92300.10,
    'tx': 1254
  },
  'micro_blocks': []
}
export default {
  name: 'AppDashboard',
  components: {
    PageHeader,
    MicroBlock,
    MicroBlocks,
    GenerationDetails,
    Generations,
    Generation,
    BreadCrumbs
  },
  data: function () {
    return {
      generation: generationData,
      confirmations: 235
    }
  }
}
</script>
<style lang="scss">
.app-dashboard {}
</style>
