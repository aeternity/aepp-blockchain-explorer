<template>
  <div class="app-transactions">
    <PageHeader title="Dashboard">
      <BreadCrumbs />
    </PageHeader>
    <TxList>
      <TXListItem
        v-for="(item, index) in transactions"
        :key="index"
        :data="item.tx"
      />
    </TxList>
    <LoadMoreButton />
  </div>
</template>

<script>

import TxList from '../../partials/transactions/txList'
import TXListItem from '../../partials/transactions/txListItem'
import PageHeader from '../../components/PageHeader'
import BreadCrumbs from '../../components/breadCrumbs'
import LoadMoreButton from '../../components/loadMoreButton'

import { mapState } from 'vuex'

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
      page: 0
    }
  },
  computed: {
    ...mapState('transactions', [
      'transactions'
    ])
  }
}
</script>
