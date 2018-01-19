<template>
  <div  v-if='apiBlock' class="block-screen screen">
    <div class="header">
      <div class="basic-block-info grid">
        <div class='block-height'>
          <span>Block</span>
          <span class='number block-height'>{{apiBlock.height}}</span>
        </div>
        <div>
          <span class='field-name'>mined by</span>
          <span class="account-address">
            <router-link :to='"/account/" + minedBy'>
              {{minedBy | startAndEnd }}
            </router-link>
          </span>
        </div>
        <div>
          <span class='field-name'>time since mined</span>
          <span class='ago' v-html='$options.filters.agoFormat(ago)'/>
        </div>
      </div>
      <div class="detail-block-info grid">
        <div class="height">
          <div class='field-name'>Height</div>
          <div class='field-value number'>{{ apiBlock.height }}</div>
        </div>
        <div class="hash">
          <div class='field-name'>Parent Hash</div>
          <div class="field-value block-hash">
            <router-link :to="'/block/' + apiBlock.prev_hash">
              {{apiBlock.prev_hash | startAndEnd }}
            </router-link>
          </div>
        </div>
        <div class="rewarded">
          <div class='field-name'>Target</div>
          <div class="field-value number">
            {{ apiBlock.target }}
          </div>
        </div>
      </div>
      <div class='block-navigation grid'>
        <router-link :to="'/block/' + (apiBlock.height - 1)">
          prev: {{apiBlock.height - 1}}
        </router-link>
        <router-link :to="'/block/' + (apiBlock.height + 1)">
          next: {{apiBlock.height + 1}}
        </router-link>
      </div>
    </div>
    <div class="block-transactions">
      <h2 class='title'>
        <span class='number'>{{txCount}}</span> Transaction(s)
      </h2>
      <table v-if='apiBlock.transactions'>
        <thead>
          <tr>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='t in apiBlock.transactions'>
            <template v-if="t.tx.type === 'CoinbaseTxObject'">
              <td>Coinbase</td>
              <td>-</td>
              <td>
                <span class="account-address">
                  <router-link :to='"/account/" + t.tx.account'>
                    {{t.tx.account | startAndEnd }}
                  </router-link>
                </span>
              </td>
              <td>block reward</td>
              <td>-</td>
            </template>
            <template v-else-if="t.tx.type === 'SpendTxObject'">
              <td>Spend</td>
              <td>
                <router-link :to='"/account/" + t.tx.sender'>
                  {{ t.tx.sender | startAndEnd }}
                </router-link>
              </td>
              <td>
                <router-link :to='"/account/" + t.tx.recipient'>
                  {{ t.tx.recipient | startAndEnd }}
                </router-link>
              </td>
              <td>
                <span class='number'>{{ t.tx.amount }}</span>
                <span class="unit">AE</span>
              </td>
              <td>
                <span class='number'>{{ t.tx.fee }}</span>
                <span class="unit">AE</span>
              </td>
            </template>
            <template v-else-if='t.tx.type === "OracleRegisterTxObject"'>
              <td>OracleRegister</td>
              <td>
                <span class="account-address">
                  <router-link :to='"/account/" + t.tx.account'>
                    {{t.tx.account | startAndEnd }}
                  </router-link>
                </span>
              </td>
              <td>-</td>
              <td>-</td>
              <td>
                <span class='number'>{{ t.tx.fee }}</span>
                <span class="unit">AE</span>
              </td>
            </template>
            <template v-else>
              <td>{{ t }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const blockHashRegex = RegExp('^bh\\$[1-9A-HJ-NP-Za-km-z]{48,49}')
const blockHeightRegex = RegExp('^[0-9]+')
export default {
  name: 'Block',
  data () {
    return {
      currentTime: null,
      apiBlock: null
    }
  },
  computed: {
    minedBy () {
      return this.apiBlock.transactions.filter(t => t.tx.type === 'CoinbaseTxObject')[0].tx.account
    },
    ago () {
      if (!this.apiBlock) { return null }
      return this.currentTime - this.apiBlock.time
    },
    txCount () {
      return this.apiBlock.transactions.length
    },
    blockId () {
      return this.$route.params.block
    }
  },
  watch: {
    blockId () {
      console.log('change')
      this.getBlock()
    }
  },
  methods: {
    getBlock () {
      if (blockHeightRegex.test(this.blockId)) {
        this.getBlockByHeight(this.blockId)
      } else if (blockHashRegex.test(this.blockId)) {
        this.getBlockByHash(this.blockId)
      }
    },
    getBlockByHeight (height) {
      this.$http.get('internal/v2/block/height/' + height + '?tx_objects=true', {
      }).then(response => {
        this.apiBlock = response.body
      }, response => {
        console.log(response)
      })
    },
    getBlockByHash (hash) {
      this.$http.get('internal/v2/block/hash/' + hash + '?tx_objects=true', {
      }).then(response => {
        this.apiBlock = response.body
      }, response => {
        console.log(response)
      })
    }
  },
  mounted () {
    this.getBlock()
    setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  }
}
</script>

<style >
.block-screen .header {
  background-color:#311B58;
  color:white;
}
.block-screen .block-transactions,
.block-screen .header > * {
  max-width:1040px;
  width:calc(100% - 40px);
  margin:0 auto;
}

.block-screen .block-navigation,
.block-screen .basic-block-info {
  justify-content:space-between;
}
.block-screen .basic-block-info {
  border-bottom:2px solid #F5F5F5;
  align-items:flex-end;
  line-height:50px;
  padding-bottom:20px;
  margin-bottom:20px;
}
.block-screen .block-navigation ,
.block-screen .detail-block-info {
  padding: 20px 0;
}
.block-screen .detail-block-info > * {
  margin-right:50px;
}
.block-screen .account-address {
  color:#F7296E;
}
.block-screen .block-height {
  font-size:30px;
}
.block-screen .ago .number {
  font-size:55px;
}
.block-screen .ago .unit {
  font-size:18px;
}
.block-screen .ago .unit + .number {
  margin-left:20px;
}
.block-screen .field-name {
  font-size:14px;
  opacity:0.4;
}
.block-screen .field-value {
  margin-top:5px;
  font-size:24px;
}
.block-screen .block-transactions .title {
  margin-top:50px;
  margin-bottom:30px;
  font-size:24px;
  font-weight:normal;
  padding-bottom:20px;
  border-bottom:2px solid #311B58;
}
</style>
