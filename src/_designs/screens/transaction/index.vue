<template>
  <div class="app-transaction">
    <h1>Transaction Overview</h1>
    <GenerationDetails
      :data="generation"
      :dynamic-data="confirmations"
      :status="loading"
    />
    <TransactionDetails
      v-for="(tx, index) in transaction"
      :key="index"
      :data="tx"
      :status="loading"
    />
  </div>
</template>

<script>
import GenerationDetails from '@/_designs/components/generationDetails'
import TransactionDetails from '@/_designs/components/transactionDetails'
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
const transactionData = [
  {
    block_height: 30546,
    block_hash: 'mh_rxs89ozj7DXk8aWBRCZPwcUp6D3hxp2KgGDFyQMnFNdn2d5YG',
    hash: 'th_dQ5fU8PDPxe1X63qiFinhj6b6m5kbu54d7WJxxw8hU3tGgeQw',
    signatures: [
      'sg_LWPTCW8LpCX24FfgfTXHJTBxtYjJf6mKa8Zpgx5tow6BN1yUM2brVmwGKiBH8wqQosHr9g7feZR6ASBrmtmotP76zahJ7'
    ],
    tx: {
      account_id: 'ak_2FopJG9xi6bzguKBFao1SR5HQ5aCjKcHCgerKww6tM6Ersundh',
      client_ttl: 36000,
      fee: 20000,
      name_id: 'nm_aNGZZC4RgpNT29gkT75o1wzXJbe9enKGWtKxvAX8rWwwJTsaK',
      name_ttl: 50000,
      nonce: 2604,
      deposit: 14434,
      amount: 4566,
      pointers: [
        {
          id: 'ak_QSNbDgTDwn1izHWdJHM1EuMiMrmVya9sy7MA1pDtJYVCxFgT6',
          key: 'account_pubkey'
        }
      ],
      ttl: 60000,
      time: 1548670493483,
      type: 'NameUpdateTx',
      version: 1
    }
  },
  {
    block_height: 30553,
    block_hash: 'mh_ifpU929ttQNKWptREmRLAYs1RtoToXqMK5DMXSpzGAVrUgU3n',
    hash: 'th_24dXRkTJhiB3tkSSQMa73w3urGo9caRcVyXMjpJ8X1RmhBhQqq',
    signatures: [
      'sg_2p8JAbeWqVYCC3ApUpp7syDUimUkUpSkG9Pdspf3ZheHfL6g1AAvsgv9KcyTQKHP9iNi6mgc1tzA2Fdw15No8a4Wvi1Jo'
    ],
    tx: {
      amount: 4566,
      fee: 20260,
      nonce: 1,
      payload: '',
      recipient_id: 'ak_2tNbVhpU6Bo3xGBJYATnqc62uXjR8yBv9e63TeYCpa6ASgEz94',
      sender_id: 'ak_259aAwV4CmhvhUfHCWcQXGsszdVw1Kq4W3iuVhpCQGcqqRqZmW',
      ttl: 30563,
      cost: 3563,
      time: 1548670493483,
      type: 'SpendTx',
      version: 1
    }
  },
  {
    block_height: 30563,
    block_hash: 'mh_9GQcovJ2jffvdJBCF5kF5ARn4KafjoVyT8EofMZCdU4pSWPJi',
    hash: 'th_TjitQ8QrECiDW4rXJ6wjfvYKj2Y923XXXmT2gqF71JvLsXTkR',
    signatures: [
      'sg_JytAXV5xDLgrhCh1fuqj9sUDH9jmf7wLLt2mbQPFP2nYYBeR3hK7ZBW9Dxogv3DUUqYhFPXFSPmyDPtvpXaMwDHmCjV5d'
    ],
    tx: {
      account_id: 'ak_24jcHLTZQfsou7NvomRJ1hKEnjyNqbYSq2Az7DmyrAyUHPq8uR',
      fee: 20000,
      name: 'ucuc.test',
      name_salt: 15052732751768221404,
      nonce: 18434,
      deposit: 14434,
      ttl: 31062,
      time: 1548670493483,
      type: 'NameClaimTx',
      version: 1
    }
  }
]

export default {
  name: 'AppTransaction',
  components: {
    GenerationDetails,
    TransactionDetails
  },
  data () {
    return {
      generation: generationData,
      transaction: transactionData,
      confirmations: 535,
      loading: true
    }
  }
}
</script>

<style scoped>

</style>
