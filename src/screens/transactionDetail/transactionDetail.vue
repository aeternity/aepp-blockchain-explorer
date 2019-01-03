<template>
  <div class="transaction-detail-screen screen">
    <div class="inner">
      <div>
        <h1 class="title">
          Transaction Detail
        </h1>
        <h2>
          <span v-if="transaction">
            {{ transaction.tx.type | txTypeToName }}
          </span>
          <FillDummy
            v-else
            size="big"
            color="grey"
          />
        </h2>
        <div>
          <Field name="Type">
            <AeBadge
              v-if="transaction"
              class="transaction-type"
            >
              {{ transaction.tx.type | txTypeToName }}
            </AeBadge>
            <FillDummy
              v-else
              color="grey"
            />
          </Field>

          <Field name="Hash">
            <AeHash
              v-if="transaction"
              :hash="transaction.hash"
              type="short"
            />
            <ViewAndCopy
              v-if="transaction"
              :text="transaction.hash"
            />
            <FillDummy
              v-else
              color="grey"
            />
          </Field>

          <div class="height-item">
            <Field name="Block Height" />
            <div v-if="!isPending">
              <RouterLink
                v-if="transaction"
                :to="`/generation/${transaction.blockHeight}`"
              >
                <span class="height-item__data">
                  {{ transaction.blockHeight }}
                </span>
              </RouterLink>
              <span
                v-if="transaction"
                class="field-value confirmations"
              >
                ( {{ height - transaction.blockHeight }} Block Confirmations )
              </span>
            </div>
            <AeLoader v-if="isPending" />
          </div>

          <div
            v-if="isPending"
            class="status-item"
          >
            <Field name="Status" />
            <span v-if="isPending">
              Pending
            </span>
          </div>

          <hr>

          <div v-if="transaction">
            <Field
              v-if="transaction.tx.account"
              name="Account"
            >
              <RouterLink :to="`/account/${transaction.tx.account}`">
                <NamedAddress
                  :address="transaction.tx.account"
                  size="short"
                />
              </RouterLink>
              <ViewAndCopy :text="transaction.tx.account" />
            </Field>
            <TypeTx
              v-if="transaction.tx.type"
              :transaction="transaction"
            />
            <Field
              v-if="transaction.tx.data_schema"
              name="Data Schema"
            >
              {{ transaction.tx.data_schema }}
            </Field>

            <Field
              v-if="transaction.tx.reward"
              name="Reward"
            >
              {{ transaction.tx.reward }}
            </Field>

            <hr>

            <Field
              v-if="transaction.tx.nonce"
              name="Nonce"
            >
              {{ transaction.tx.nonce }}
            </Field>

            <Field
              v-if="transaction.tx.ttl"
              name="TTL"
            >
              {{ transaction.tx.ttl }}
            </Field>

            <Field
              v-if="transaction.tx.vsn"
              name="Vsn"
            >
              {{ transaction.tx.vsn }}
            </Field>

            <div v-if="transaction.signatures">
              <h3>Signatures</h3>
              <Field
                v-for="(signature, n) in transaction.signatures"
                :key="n"
                :name="n.toString()"
              >
                <AeHash
                  :hash="signature"
                  type="short"
                />
                <ViewAndCopy :text="signature" />
              </Field>
            </div>
          </div>
          <div v-else>
            <div><FillDummy color="grey" /></div>
            <div>
              <FillDummy
                color="grey"
                size="big"
              />
            </div>
            <div>
              <FillDummy
                color="grey"
                size="big"
              />
            </div>
            <div>
              <FillDummy
                color="grey"
                size="big"
              />
            </div>
            <div><FillDummy color="grey" /></div>
            <div>
              <FillDummy
                color="grey"
                size="big"
              />
            </div>
            <div>
              <FillDummy
                color="grey"
                size="big"
              />
            </div>
            <div>
              <FillDummy
                color="grey"
                size="big"
              />
            </div>
          </div>
        </div>
        <ObjView
          v-if="transaction"
          :obj="transaction"
          class="objView"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  AeBadge,
  AeLoader
} from '@aeternity/aepp-components'

import TypeTx from './typeTx'

import AeHash from '../../components/aeHash.vue'
import Field from '../../components/field.vue'
import NamedAddress from '../../components/namedAddress.vue'
import ViewAndCopy from '../../components/viewAndCopy.vue'
import txTypeToName from '../../filters/txTypeToName'
import FillDummy from '../../components/fillDummy'
import ObjView from '../../components/objView.vue'

export default {
  name: 'TransactionDetail',
  components: {
    AeBadge,
    AeHash,
    NamedAddress,
    Field,
    ViewAndCopy,
    FillDummy,
    AeLoader,
    TypeTx,
    ObjView
  },
  filters: { txTypeToName },
  props: {
    txId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      height: 0
    }
  },
  computed: mapState('transactions', {
    transaction ({ transactions }) {
      return transactions[this.txId]
    },
    isPending () {
      if (this.transaction) {
        return ((this.transaction.blockHash) === 'none' && (this.transaction.blockHeight === -1))
      }
    }
  }),
  async beforeMount () {
    this.height = await this.$store.dispatch('blocks/height')
  },
  async mounted () {
    await this.$store.dispatch('transactions/getTxByHash', this.txId)
    this.height = await this.$store.dispatch('blocks/height')
  }
}
</script>
<style scoped lang='scss' src='./transactionDetail.scss'/>
