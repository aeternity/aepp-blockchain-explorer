<template>
  <div :class='transaction.tx.type' @click='openDetail()' class='transaction'>
    <div class="transaction-header">
      <div>
        <tx-type type='badge' :txtype=' transaction.tx.type '/>
      </div>

      <field name='nonce' v-if='transaction.tx.nonce'>
        <div class="number">
          {{ transaction.tx.nonce }}
        </div>
      </field>

      <div v-if='transaction.tx.fee'>
        <div class='field-name'>fee</div>
        <div>
          <span class='number'>{{ transaction.tx.fee }}</span>
          <span class="unit">AE</span>
        </div>
      </div>
      <div>
        <div class='field-name'>block</div>
        <div class='number'>
          <router-link v-if='transaction.block_height' :to='"/block/" + transaction.block_height'>
            {{ transaction.block_height }}
          </router-link>
          <template v-else>
            n/a
          </template>
        </div>
      </div>
    </div>
    <div class='transaction-body'>

      <template v-if='transaction.tx.type === "coinbase_tx"'>
        <div class="grid">
          <div>
            <div class='field-name'>receiver</div>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.account'>
                {{transaction.tx.account | startAndEnd}}
              </router-link>
            </div>
          </div>
          <div>
            <div class='field-name'>reward</div>
              <span class="number">{{transaction.tx.reward}}</span>
              <span class="unit">AE</span>
          </div>
        </div>
      </template>

      <template v-else-if='transaction.tx.type === "spend_tx"'>
        <div class="grid">
        <div>
          <span class='field-name'>sender</span>
          <div class="account-address">
            <router-link :to='"/account/" + transaction.tx.sender'>
              <named-address :address='transaction.tx.sender'/>
            </router-link>
          </div>
        </div>
        <div>
          <span class='field-name'>recipient</span>
          <div class="account-address">
            <router-link :to='"/account/" + transaction.tx.recipient'>
              <named-address :address='transaction.tx.recipient'/>
            </router-link>
          </div>
        </div>
        <div>
          <div class='field-name'>amount</div>
          <span class='number'>{{ transaction.tx.amount }}</span>
          <span class="unit">AE</span>
        </div>
        </div>
      </template>

      <template v-else-if='transaction.tx.type === "oracle_register_tx"'>
        <div class="grid">
          <div>
            <span class='field-name'>account</span>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.account'>
                <named-address :address='transaction.tx.account'/>
              </router-link>
            </div>
          </div>
          <div>
            <div class='field-name'>TTL</div>
            {{ transaction.tx.ttl.type}}
            <span class='number'>{{ transaction.tx.ttl.value }}</span>
          </div>
          <div v-if='transaction.tx.query_fee'>
            <div class='field-name'>QueryFee</div>
            <span class='number'>{{ transaction.tx.query_fee }}</span>
            <span class="unit">AE</span>
          </div>
        </div>

        <div>
          <div class='field-name'>QuerySpec </div>
          <pre class="query-spec">{{ transaction.tx.query_spec }}</pre>
        </div>
        <div>
          <div class='field-name'>ResponseSpec </div>
          <pre class="response-spec">{{ transaction.tx.response_spec }}</pre>
        </div>
      </template>

      <template v-else-if='transaction.tx.type === "oracle_response_tx"'>
        <div class="grid">
          <div>
            <span class='field-name'>Oracle</span>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.account'>
                <named-address :address='transaction.tx.account'/>
              </router-link>
            </div>
          </div>
          <div>
            <span class='field-name'>QueryId</span>
            <div class="">
              {{ transaction.tx.query_id }}
            </div>
          </div>
        </div>
        <div>
          <span class='field-name'>Response</span>
          <pre v-if='responsePrettyJson ' class="response">{{ responsePrettyJson }}</pre>
          <pre v-else class="response">{{ transaction.tx.response }}</pre>
        </div>
      </template>

      <template v-else-if='transaction.tx.type === "oracle_query_tx"'>
        <div class="grid">
          <div>
            <div class='field-name'>Oracle</div>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.oracle'>
                {{transaction.tx.oracle | startAndEnd}}
              </router-link>
            </div>
          </div>
          <div>
            <div class='field-name'>sender</div>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.sender'>
                {{transaction.tx.sender | startAndEnd}}
              </router-link>
            </div>
          </div>
        </div>
        <div class="grid">
          <div>
            <div class='field-name'>QueryTTL</div>
            {{ transaction.tx.query_ttl.type }}
            <span class="number">
              {{ transaction.tx.query_ttl.value }}
            </span>
          </div>
          <div>
            <div class='field-name'>ResponseTTL</div>
            {{ transaction.tx.response_ttl.type}}
            <span class="number">
              {{ transaction.tx.response_ttl.value }}
            </span>
          </div>
          <div v-if='transaction.tx.query_fee'>
            <div class='field-name'>QueryFee</div>
            <span class='number'>{{ transaction.tx.query_fee }}</span>
            <span class="unit">AE</span>
          </div>
        </div>
        <div>
          <div class='field-name'>Query</div>
          <pre class="query">{{ transaction.tx.query }}</pre>
        </div>
      </template>

      <template v-else-if='transaction.tx.type === "name_update_tx"'>
        <router-link :to='"/account/" + transaction.tx.account'>
          <named-address :address='transaction.tx.account'/>
        </router-link>
        <field name='Name Hash'>
          <ae-hash :hash='transaction.tx.name_hash'/>
        </field>
        <field name='Name Hash'>
        {{transaction.tx.name_ttl}}
        </field>
        {{transaction.tx.pointers.account_pubkey}}
        {{transaction.tx.ttl}}
      </template>
      <template v-else-if='transaction.tx.type === "name_claim_tx"'>
        <router-link :to='"/account/" + transaction.tx.account'>
          <named-address :address='transaction.tx.account'/>
        </router-link>
        {{transaction.tx.name}}
        {{transaction.tx.name_salt}}
      </template>
      <template v-else-if='transaction.tx.type === "name_preclaim_tx"'>
        <router-link :to='"/account/" + transaction.tx.account'>
          <named-address :address='transaction.tx.account'/>
        </router-link>
        {{transaction.tx.commitment}}
        {{transaction.tx.fee}}
      </template>

      <template v-else>
        {{transaction}}
      </template>

    </div>

  </div>
</template>
<script>
import NamedAddress from '../../components/namedAddress/namedAddress.vue'
import TxType from '../../components/txType/txType.vue'
import AeHash from '../../components/aeHash/aeHash.vue'
import Field from '../../components/field/field.vue'
export default {
  name: 'transaction',
  props: [
    'transaction'
  ],
  methods: {
    openDetail () {
      this.$router.push({name: 'TransactionDetail', params: { txId: this.transaction.hash }})
    }
  },
  components: {
    NamedAddress,
    TxType,
    Field,
    AeHash
  },
  computed: {
    responsePrettyJson () {
      if (!this.transaction) return null
      if (!this.transaction.tx.response) return null
      try {
        return JSON.parse(this.transaction.tx.response)
      } catch (e) {
        return null
      }
    }
  }
}
</script>
<style src='./transaction.scss' lang='scss' />
