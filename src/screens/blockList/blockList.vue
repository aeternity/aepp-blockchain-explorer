<template>
  <div class="block-list-screen screen">
    <div class="inner">
    <div class="grid">
      <div class='title'>
        Blocks
      </div>
      <div class="field average-block-time">
        <span class='field-name'>average block time</span>
        <span class='ago' v-html='$options.filters.agoFormat(averageBlockTime)'/>
      </div>
      <div>
        <span class="field-name">
        time since last block
        </span>
        <span class='ago' v-html='$options.filters.agoFormat(lastBlockAgo)'/>
      </div>
    </div>

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
            <span class="field-name">
              hash
            </span>
            <span class="number">
              {{b.hash | startAndEnd }}
            </span>
          </td>
          <td>
            <span class="field-name">
            target
            </span>
            <span class="number">
              {{b.target}}
            </span>
          </td>
          <td>
            <span class='number'>
              {{b.transactions.length}}
            </span>
            <span class="field-name">
              Transaction(s)
            </span>
          </td>
          <td>
            <span class="field-name">
              mined by
            </span>
            <span class="account-address">
              <router-link :to='"/account/" + b.transactions[0].tx.account'>
                {{b.transactions[0].tx.account | startAndEnd}}
              </router-link>
            </span>
          </td>
          <td>
            <span class="field-name">
              time
            </span>
            <span class="number">
              <span class='' v-html='$options.filters.agoFormat(currentTime - b.time)'/>
            </span>
          </td>
        </template>
        <template v-else-if="typeof b.then !== 'undefined'">
          <td colspan="3">
          Loading..
          </td>
        </template>
      </tr>
    </table>
    <button @click='getBlocks(10)'>load more</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentTime: null,
      blockHeight: null,
      apiBlocks: []
    }
  },
  computed: {
    averageBlockTime () {
      let avTime = this.apiBlocks.reduce(
        (average, block, i, blocks) => {
          if (blocks.length < i + 2) return average
          if (typeof block.then !== 'undefined') return average
          if (typeof blocks[i + 1].then !== 'undefined') return average
          return Math.round((average + (block.time - blocks[i + 1].time)) / 2)
        }
      , 0)
      return avTime
    },
    lastBlockAgo () {
      if (this.apiBlocks.length > -1 && typeof this.apiBlocks[0].time !== 'undefined') {
        return this.currentTime - this.apiBlocks[0].time
      }
      return null
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
          this.$set( this.apiBlocks, i, resp.body )
        })
      })
      this.blockHeight = i
      console.log(i)
    }
  },
  mounted () {
    setInterval(() => {
      this.currentTime = new Date()
    }, 1000)

    this.$http.get(`internal/v2/block/number`
    ).then(resp => {
      this.blockHeight = resp.body.height
      this.getBlocks(10)
    }, resp => {
    })
  }
}
</script>
<style>
.block-list-screen {
  background: #311B58;
  color:white;;
}
.block-list-screen .inner {
  margin:0 auto;
  max-width:1040px;
  width:calc(100% - 40px);

}
.block-list-screen .field-name {
  font-size:16px;
}
.block-list-screen .grid {
  border-bottom:2px solid #F5F5F5;
  justify-content:space-between;
  align-items:flex-end;
  padding-bottom:15px;
}
.block-list-screen .title {
  font-weight:500;
  font-size:30px;
}
.block-list-screen .ago .number {
  font-size:55px;
}
.block-list-screen .ago .unit {
  font-size:18px;
}
.block-list-screen .ago .unit + .number {
  margin-left:20px;
}
.block-list-screen .block-number {
  font-size:30px;
}
.block-list-screen .account-address {
  color:#F7296E;
}
</style>
