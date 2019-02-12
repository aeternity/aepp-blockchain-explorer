<template>
  <div class="app-transactions">
    <PageHeader title="Dashboard">
      <BreadCrumbs />
    </PageHeader>
    <TxList>
      <TXListItem
        v-for="(item, index) in data"
        :key="index"
        :data="item.tx"
      />
    </TxList>
    <LoadMoreButton />
  </div>
</template>

<script>
import TxList from '~/partials/transactions/txList'
import TXListItem from '~/partials/transactions/txListItem'
import PageHeader from '~/components/PageHeader'
import BreadCrumbs from '~/components/BreadCrumbs'
import LoadMoreButton from '~/components/loadMoreButton'

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
  name: 'AppTransactions',
  components: {
    TxList,
    TXListItem,
    PageHeader,
    BreadCrumbs,
    LoadMoreButton
  },
  data () {
    return {
      data: transactionData
    }
  }
}
</script>

<style scoped>

</style>
