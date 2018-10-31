<template>
  <div class="latest-generation-partial">
    <div class="grid">
      <div class="explanation">
        <h2 class="title">Latest Generation</h2>
        <ae-button type="exciting" size="small" :to="`/generation/${height}`">view last</ae-button>
        <ae-button type="exciting" size="small" to="/generations">view all</ae-button>
      </div>
      <div class="generation-data">
        <h2>Generation</h2>
        <div class="grid generation">
          <div class="field">
            <div class="field-name">
              Height
            </div>
            <div class="field-value number"  v-if="generation">
              <router-link :to="`/generation/${height}`">{{ height }}</router-link>
            </div>
            <fill-dummy v-else/>
          </div>
          <div class="field">
            <div class="field-name">Micro Blocks</div>
            <div class="field-value number" v-if="generation">
              {{ generation.microBlocksDetailed.length}}
            </div>
            <fill-dummy v-else/>
          </div>
          <div class="field">
            <div class="field-name">Transactions</div>
            <div class="field-value number" v-if="generation">
              {{ generation.numTransactions }}
            </div>
            <fill-dummy v-else/>
          </div>
        </div>

        <div class="grid">
          <h2>Key Block</h2>
        </div>
        <div class="grid block-extended-info">
          <div class="field">
            <div class="field-name">Hash</div>
            <div class="field-value block-hash" v-if="generation">
              <router-link :to="`/block/${generation.keyBlock.hash}`">
                <ae-hash type='short' :hash="generation.keyBlock.hash"/>
              </router-link>
            </div>
            <fill-dummy v-else/>
          </div>
          <div class="field">
            <div class="field-name">Mined by</div>
            <div class="field-value account-address" v-if="generation">
              <router-link :to="`/account/${generation.keyBlock.miner}`">
                <named-address :address="generation.keyBlock.miner" />
              </router-link>
            </div>
            <fill-dummy v-else/>
          </div>
          <div class="field">
            <div class="field-name">Time since mined</div>
            <div class="field-value number" v-if="generation">
              <relative-time :ts="currentTime - generation.keyBlock.time" />
            </div>
            <fill-dummy v-else/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { AeButton } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import AeHash from '../../components/aeHash'
import NamedAddress from '../../components/namedAddress'
import FillDummy from '../../components/fillDummy'

export default {
  components: { AeButton, RelativeTime, AeHash, NamedAddress, FillDummy },
  mixins: [ currentTime ],
  computed: mapState('blocks', {
    generation: ({ generations }) => generations[0],
    height: ({ height }) => height
  })
}
</script>
<style src='./latestBlock.scss' lang='scss' />
