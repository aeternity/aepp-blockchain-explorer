<template>
  <div :class='transaction.tx.type' class='transaction'>
    <div class="header">
      <field>
        <tx-type type='badge' :txtype=' transaction.tx.type '/>
      </field>

      <field name='nonce' v-if='transaction.tx.nonce'>
        <div class="number">
          {{ transaction.tx.nonce }}
        </div>
      </field>

      <field name='fee' v-if='transaction.tx.fee'>
        <div>
          <span class='number'>{{ transaction.tx.fee }}</span>
          <span class="unit">AE</span>
        </div>
      </field>
      <field name='block'>
        <div class='number'>
          <router-link v-if='transaction.blockHeight' :to='"/block/" + transaction.blockHeight'>
            {{ transaction.blockHeight }}
          </router-link>
          <template v-else>
            n/a
          </template>
        </div>
      </field>
      <field v-if='transaction.hash' name='tx hash'>
        <router-link :to='"/tx/" + transaction.hash'>
          <ae-hash type="short" :hash='transaction.hash'/>
        </router-link>
      </field>
    </div>
    <div class='body'>

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
          <field name="sender">
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.sender'>
                <named-address :address='transaction.tx.sender'/>
              </router-link>
            </div>
          </field>
          <field name='recipient'>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.recipient'>
                <named-address :address='transaction.tx.recipient'/>
              </router-link>
            </div>
          </field>
          <field name='amount'>
            <span class='number'>{{ transaction.tx.amount }}</span>
            <span class="unit">AE</span>
          </field>
        </div>
      </template>

      <template v-else-if='transaction.tx.type === "oracle_register_tx"'>
        <div class="grid">
          <field name="">
            <span class='field-name'>account</span>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.account'>
                <named-address :address='transaction.tx.account'/>
              </router-link>
            </div>
          </field>
          <field name="">
            <div class='field-name'>TTL</div>
            {{ transaction.tx.ttl.type}}
            <span class='number'>{{ transaction.tx.ttl.value }}</span>
          </field>
          <field name="" v-if='transaction.tx.query_fee'>
            <div class='field-name'>QueryFee</div>
            <span class='number'>{{ transaction.tx.query_fee }}</span>
            <span class="unit">AE</span>
          </field>
        </div>

        <field>
          <div class='field-name'>QuerySpec </div>
          <pre class="query-spec">{{ transaction.tx.query_spec }}</pre>
        </field>
        <field>
          <div class='field-name'>ResponseSpec </div>
          <pre class="response-spec">{{ transaction.tx.response_spec }}</pre>
        </field>
      </template>

      <template v-else-if='transaction.tx.type === "oracle_response_tx"'>
        <div class="grid">
          <field>
            <span class='field-name'>Oracle</span>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.account'>
                <named-address :address='transaction.tx.account'/>
              </router-link>
            </div>
          </field>
          <field>
            <span class='field-name'>QueryId</span>
            <div class="">
              {{ transaction.tx.query_id }}
            </div>
          </field>
        </div>
        <field>
          <span class='field-name'>Response</span>
          <pre v-if='responsePrettyJson ' class="response">{{ responsePrettyJson }}</pre>
          <pre v-else class="response">{{ transaction.tx.response }}</pre>
        </field>
      </template>

      <template v-else-if='transaction.tx.type === "oracle_query_tx"'>
        <div class="grid">
          <field>
            <div class='field-name'>Oracle</div>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.oracle'>
                {{transaction.tx.oracle | startAndEnd}}
              </router-link>
            </div>
          </field>
          <field>
            <div class='field-name'>sender</div>
            <div class="account-address">
              <router-link :to='"/account/" + transaction.tx.sender'>
                {{transaction.tx.sender | startAndEnd}}
              </router-link>
            </div>
          </field>
        </div>
        <div class="grid">
          <field>
            <div class='field-name'>QueryTTL</div>
            {{ transaction.tx.query_ttl.type }}
            <span class="number">
              {{ transaction.tx.query_ttl.value }}
            </span>
          </field>
          <field>
            <div class='field-name'>ResponseTTL</div>
            {{ transaction.tx.response_ttl.type}}
            <span class="number">
              {{ transaction.tx.response_ttl.value }}
            </span>
          </field>
          <field v-if='transaction.tx.query_fee'>
            <div class='field-name'>QueryFee</div>
            <span class='number'>{{ transaction.tx.query_fee }}</span>
            <span class="unit">AE</span>
          </field>
        </div>
        <field>
          <div class='field-name'>Query</div>
          <pre class="query">{{ transaction.tx.query }}</pre>
        </field>
      </template>

      <template v-else-if='transaction.tx.type === "name_update_tx"'>
        <div class="grid">
          <field name='Account'>
            <router-link :to='"/account/" + transaction.tx.account'>
              <named-address :address='transaction.tx.account'/>
            </router-link>
          </field>
          <field name='Name Hash'>
            <ae-hash type="short" :hash='transaction.tx.name_hash'/>
          </field>
          <field name="Name TTL">
            {{transaction.tx.name_ttl}}
          </field>
          <field name="TTL">
            {{transaction.tx.ttl}}
          </field>
        </div>
      </template>
      <template v-else-if='transaction.tx.type === "name_claim_tx"'>
        <div class="grid">
          <field name="account">
            <router-link :to='"/account/" + transaction.tx.account'>
              <named-address :address='transaction.tx.account'/>
            </router-link>
          </field>
          <field name="name">
            {{transaction.tx.name}}
          </field>
          <field name="name_salt">
            {{transaction.tx.name_salt}}
          </field>
        </div>
      </template>
      <template v-else-if='transaction.tx.type === "name_preclaim_tx"'>
        <div class="grid">
          <field name="account">
            <router-link :to='"/account/" + transaction.tx.account'>
              <named-address :address='transaction.tx.account'/>
            </router-link>
          </field>
          <field name="commitment">
            <ae-hash type='short' :hash="transaction.tx.commitment" />
          </field>
          <field name="fee">
            {{transaction.tx.fee}}
          </field>
        </div>
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
