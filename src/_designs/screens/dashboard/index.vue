<template>
  <div class="app-dashboard">
    <h1>App-Dashboard</h1>
    <!-- static table -->
    <AppTable
      details
    >
      <AppRow
        extend
      >
        <AppCell
          title="Difficulty"
          content="87472467200"
        />
        <AppCell
          title="Target"
          content="536930672"
        />
      </AppRow>
      <AppRow>
        <AppCell
          extend
          title="Hash"
          hash="kh_  25 UQc Zb8 caG m8q vs6 nNy KmS eSK Xya AKg ow5 8XL VEZ mBk Pmr L5N"
        />
      </AppRow>
    </AppTable>

    <!-- dynamic table -->
    <h2>Dynamic table</h2>

    <AppTable
      v-for="transaction in transactions"
      :key="transaction.id"
      details
    >
      <AppRow>
        <AppCell
          extend
          title="Hash"
          :hash="transaction.block_hash"
        />
      </AppRow>
      <AppRow>
        <AppCell
          title="Difficulty"
          :content="transaction.tx.amount"
        />
        <AppCell
          title="Target"
          :content="transaction.tx.ttl"
        />
      </AppRow>
      <AppRow>
        <AppCell
          extend
          title="Miner"
          :hash="transaction.tx.recipient_id"
        />
      </AppRow>
      <AppRow>
        <AppCell
          title="Nonce"
          :content="transaction.tx.nonce"
        />
        <AppCell
          title="Version"
          :content="transaction.tx.version"
        />
      </AppRow>
      <AppRow>
        <AppCell
          extend
          title="Signature"
          :hash="transaction.signatures[0]"
        />
      </AppRow>
      <AppRow>
        <AppCell
          extend
          title="Prev Hash"
          :hash="transaction.tx.recipient_id"
        />
      </AppRow>
      <AppRow>
        <AppCell
          extend
          title="Prev Key Hash"
          :hash="transaction.tx.recipient_id"
        />
      </AppRow>
      <AppRow>
        <AppCell
          extend
          title="State Hash"
          :hash="transaction.tx.recipient_id"
        />
      </AppRow>
      <AppRow>
        <AppCell
          extend
          title="Pow"
          :hash="transaction.tx.pow"
        />
      </AppRow>
    </AppTable>
  </div>
</template>
<script>
import AppTable from '@/_designs/components/appTable'
import AppRow from '@/_designs/components/appRow'
import AppCell from '@/_designs/components/appCell'

const transactions = [
  {
    'block_hash': 'mh_Gy3fyo2kqHGYoHPGEdhsctYpeBVLdBJypmra35RftLRH659pi',
    'block_height': 7033,
    'hash': 'th_pbqRbznJVqg7wc1YHvozNQiLf9RUTpwjCcgS5H5v7ERQGRcVZ',
    'signatures': [
      'sg_ShZnBv6ta64un3C2QpSRjgSxpZj8k76uP46yUvnhfAC6U5LC5RX2gUvmsDVk9kRknPPRXoSLXE53sqcxrXR7hhNxsGJNu', 'sg_ShZnBv6ta64un3C2QpSRjgSxpZj8k76uP46yUvnhfAC6U5LC5RX2gUvmsDVk9kRknPPRXoSLXE53sqcxrXR7hhNxsGJNu'
    ],
    'tx': {
      'amount': 100000000000000,
      'fee': 20000,
      'nonce': 7,
      'payload': '12345',
      'recipient_id': 'ak_25AVkWKP3nm6NFt1jU3PHh5vCpxVzLs7CaadjSE2ENoZpk8Wgy',
      'sender_id': 'ak_sLbiaANfRJV32QA6c2H7Q323RingZenWbBdnhVmrYYmTND6RP',
      'ttl': 7533,
      'type': 'SpendTx',
      'version': 1,
      'pow': '1877215627402933322341844388567960766368639765428218865310525113771389414969156541612117697177411838318420188332164122692230272483825814259332606926464269032694428659292773047930642308653152332336'
    }
  }
]

export default {
  name: 'AppDashboard',
  components: {
    AppTable,
    AppRow,
    AppCell
  },
  data: function () {
    return { transactions: transactions }
  }
}
</script>
<style lang="scss">
@import '../../styles/index';
.app-dashboard {}
</style>
