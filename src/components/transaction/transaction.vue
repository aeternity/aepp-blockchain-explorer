<template>
  <div :class='transaction.tx.type' class='transaction'>
    <div class="transaction-header">
      <div>
        <div :class='transaction.tx.type' class="transaction-type">
          {{ transaction.tx.type }}
        </div>
      </div>
      <div v-if='transaction.tx.nonce'>
        <div class='field-name'>nonce</div>
        <div class="number">
          {{ transaction.tx.nonce }}
        </div>
      </div>
      <div v-if=' transaction.tx.fee '>
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

      <template v-if='transaction.tx.type === "aec_coinbase_tx"'>
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
            <div class='field-name'>amount</div>
            block reward
          </div>
        </div>
      </template>

      <template v-else-if='transaction.tx.type === "aec_spend_tx"'>
        <div class="grid">
        <div>
          <span class='field-name'>sender</span>
          <div class="account-address">
            <router-link :to='"/account/" + transaction.tx.sender'>
              {{transaction.tx.sender| startAndEnd}}
            </router-link>
          </div>
        </div>
        <div>
          <span class='field-name'>recipient</span>
          <div class="account-address">
            <router-link :to='"/account/" + transaction.tx.recipient'>
              {{transaction.tx.recipient| startAndEnd}}
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

      <template v-else-if='transaction.tx.type === "aec_oracle_register_tx"'>
        <div class="grid">
          <div>
            <span class='field-name'>account</span>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.account'>
                {{transaction.tx.account | startAndEnd}}
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

      <template v-else-if='transaction.tx.type === "aec_oracle_response_tx"'>
        <div class="grid">
          <div>
            <span class='field-name'>Oracle</span>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.account'>
                {{transaction.tx.oracle | startAndEnd}}
              </router-link>
            </div>
          </div>
          <div>
            <span class='field-name'>QueryId</span>
            <div class="">
              {{ transaction.tx.query_id | startAndEnd }}
            </div>
          </div>
        </div>
        <div>
          <span class='field-name'>Response</span>
          <pre class="response">{{ transaction.tx.response }}</pre>
        </div>
      </template>

      <template v-else-if='transaction.tx.type === "oracle_query"'>
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

      <template v-else>
        {{transaction}}
      </template>

    </div>

  </div>
</template>
<script>
export default {
  name: 'transaction',
  props: [
    'transaction'
  ]
}
</script>
<style src='./transaction.scss' lang='scss' />
