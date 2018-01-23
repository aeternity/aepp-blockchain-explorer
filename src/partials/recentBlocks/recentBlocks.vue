<template>
  <div class="recent-blocks-partial">
    <div class="inner">
      <h2>Recent blocks</h2>
      <p>View the latest blocks on the aeternity blockchain</p>
      <table>
        <tr v-for='b in apiBlocks'>
          <template v-if="typeof b.then === 'undefined'">
            <td>
              <div class="block-number">
                <router-link :to='"/block/" + b.height'>
                  {{b.height}}
                </router-link>
              </div>
            </td>
            <td>
              <span class='number'>
                {{b.transactions.length}}
              </span>
              Transaction(s)
            </td>
            <td>
              mined by
              <span class="account-address">
                <router-link :to='"/account/" + b.transactions[0].tx.account'>
                  {{b.transactions[0].tx.account | startAndEnd}}
                </router-link>
              </span>
            </td>
          </template>
          <template v-else-if="typeof b.then !== 'undefined'">
            Loading..
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      blockHeight: null,
      apiBlocks: []
    }
  },
  methods: {
    getBlocks (count) {
      console.log('x')
      let i
      for (i = this.blockHeight; i > this.blockHeight - count; i--) {
        let x = this.$http.get('internal/v2/block/height/' + i + '?tx_objects=true', { })
        this.apiBlocks.push(x)
      }
      this.apiBlocks.forEach((x, i) => {
        if (typeof x.then === 'undefined') return
        x.then(resp => {
          this.apiBlocks[i] = resp.body
          this.$forceUpdate()
        })
      })
      this.blockHeight = i
      console.log(i)
    }
  },
  mounted () {
    this.$http.get(`internal/v2/block/number`
    ).then(resp => {
      this.blockHeight = resp.body.height
      this.getBlocks(3)
    }, resp => {
    })
  }
}
</script>
<style>
.recent-blocks-partial {
  margin-top:80px;
  background:white;;
}
.recent-blocks-partial > .inner {
  box-sizing: border-box;
  max-width:1040px;
  width:calc(100% - 40px);
  background: #311B58;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.11);
  border-radius: 10px;
  color:white;
  padding:50px;
  margin:0 auto;
}
.recent-blocks-partial .block-number a {
  font-size:30px;
}
.recent-blocks-partial .account-address {
  color: #F7296E
}
</style>
