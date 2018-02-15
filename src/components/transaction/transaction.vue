<template>
  <div class='transaction'>
    <template v-if='transaction.tx.type === "coinbase"'>
      <div>
        <span class='field-name'>type</span>
        Coinbase
      </div>
      <div>
        <!----->
      </div>
      <div>
        <span class='field-name'>receiver</span>
        <span class="account-address">
          <router-link :to='"/account/" + transaction.tx.account'>
            {{transaction.tx.account | startAndEnd}}
          </router-link>
        </span>
      </div>
      <div>
        <span class='field-name'>amount</span>
        block reward
      </div>
      <div>
        <span class='field-name'>no fee</span>
      </div>
    </template>
    <template v-else-if='transaction.tx.type === "spend"'>
      <div>
        <span class='field-name'>type</span>
        Spend
      </div>
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
        <span class='field-name'>amount</span>
        <span class='number'>{{ transaction.tx.amount }}</span>
        <span class="unit">AE</span>
      </div>
      <div>
        <span class='field-name'>fee</span>
        <span class='number'>{{ transaction.tx.fee }}</span>
        <span class="unit">AE</span>
      </div>
    </template>
    <template v-else-if='transaction.tx.type === "oracle_register"'>
      <div>
        <span class='field-name'>type</span>
        OracleRegister
      </div>
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
        {{ transaction.tx.ttl.value }}
      </div>

      <div>
        <div class='field-name'>QuerySpec </div>
        {{ transaction.tx.query_spec }}
      </div>
      <div>
        <div class='field-name'>ResponseSpec </div>
        {{ transaction.tx.response_spec }}
      </div>


    </template>

    <template v-else-if='transaction.tx.type === "oracle_response"'>
      <div>
        <span class='field-name'>type</span>
        OracleResponse
      </div>
      <div>
        <span class='field-name'>QueryId</span>
        <div class="">
          {{ transaction.tx.query_id | startAndEnd }}
        </div>
      </div>
      <div>
        <span class='field-name'>Response</span>
        <div class="">
          {{ transaction.tx.response }}
        </div>
      </div>
      <div>
        <span class='field-name'>Oracle</span>
        <div class="account-address">
          <router-link :to='"/account/" + transaction.tx.account'>
            {{transaction.tx.oracle | startAndEnd}}
          </router-link>
        </div>
      </div>
    </template>

    <template v-else-if='transaction.tx.type === "oracle_query"'>

      <div>
        <span class='field-name'>type</span>
        OracleQuery
      </div>
      <div>
        <span class='field-name'>Query</span>
        <div class="">
          {{ transaction.tx.query }}
        </div>
      </div>
      <div>
        <span class='field-name'>sender</span>
        <div class="account-address">
          <router-link :to='"/account/" + transaction.tx.sender'>
            {{transaction.tx.sender | startAndEnd}}
          </router-link>
        </div>
      </div>
      <div>
        <span class='field-name'>Oracle</span>
        <div class="account-address">
          <router-link :to='"/account/" + transaction.tx.oracle'>
            {{transaction.tx.oracle | startAndEnd}}
          </router-link>
        </div>
      </div>

      <div>
        <div class='field-name'>QueryTTL</div>
        {{ transaction.tx.query_ttl.type }}
        {{ transaction.tx.query_ttl.value }}
      </div>

      <div>
        <div class='field-name'>ResponseTTL</div>
        {{ transaction.tx.response_ttl.type}}
        {{ transaction.tx.response_ttl.value }}
      </div>


    </template>

    <template v-else>
      {{transaction}}
    </template>

    <div v-if='transaction.tx.query_fee'>
      <div class='field-name'>QueryFee</div>
      <span class='number'>{{ transaction.tx.query_fee }}</span>
      <span class="unit">AE</span>
    </div>
    <div v-if='transaction.tx.nonce'>
      <span class='field-name'>nonce</span>
      <div class="">
        {{ transaction.tx.nonce }}
      </div>
    </div>
    <div v-if=' transaction.tx.fee '>
      <div class='field-name'>fee</div>
      <span class='number'>{{ transaction.tx.fee }}</span>
      <span class="unit">AE</span>
    </div>
    <div>
      <div class='field-name'>block</div>
      <router-link v-if='transaction.block_height' :to='"/block/" + transaction.block_height'>
        {{ transaction.block_height }}
      </router-link>
      <template v-else>
        n/a
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
