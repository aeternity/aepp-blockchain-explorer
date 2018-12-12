<template>
  <div class="generation-list-screen screen">
    <div class="inner">
      <div class="grid">
        <div class="title">
          Generations
        </div>
        <div class="field average-block-time">
          <span class="field-name">
            average rate 1 per
          </span>
          <RelativeTime
            :ts="getAverageBlockTime"
            big
            spaced
            v-if="getAverageBlockTime"
          />
        </div>
        <div>
          <span class="field-name">
            last key block mined
          </span>
          <RelativeTime
            :ts="getLastMinedBlockTime(currentTime)"
            big
            spaced
            v-if="getAverageBlockTime"
          />
          <span class="field-name">
            ago
          </span>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="transactions">
          <tr
            v-for="i in numGenerations"
            :key="i"
          >
            <td>
              <transition name="fade">
                <div
                  v-if="generations[height-i+1]"
                  class="height"
                >
                  <RouterLink :to="`/generation/${generations[height-i+1].keyBlock.height}`">
                    {{ generations[height-i+1].keyBlock.height }}
                  </RouterLink>
                </div>
                <FillDummy  v-else />
              </transition>
            </td>
            <td>
               <span class="field-name">
                  key-hash
                </span>
              <transition name="fade">
                <span
                  v-if="generations[height-i+1]"
                  class="number"
                >
                  <AeHash
                    :hash="generations[height-i+1].keyBlock.hash"
                    type="short"
                  />
                </span>
                <FillDummy v-else />
              </transition>
            </td>
            <td>
               <span class="field-name">
                  Micro Blocks
                </span>
              <transition name="fade">
                <span
                  v-if="generations[height-i+1]"
                  class="number"
                >
                  {{ generations[height-i+1].microBlocksDetailed.length }}
                </span>
                <FillDummy
                  v-else
                  size="small"
                />
              </transition>
            </td>
            <td>
               <span class="field-name">
                  Tx
                </span>
              <transition name="fade">
                <span
                  v-if="generations[height-i+1]"
                  class="number"
                >
                  {{ generations[height-i+1].numTransactions }}
                </span>
                <FillDummy
                  v-else
                  size="small"
                />
              </transition>
            </td>
            <td>
               <span class="field-name">
                  beneficiary
                </span>
              <transition name="fade">
                <span
                  v-if="generations[height-i+1]"
                  class="account-address"
                >
                  <RouterLink :to="`/account/${generations[height-i+1].keyBlock.beneficiary}`">
                    <NamedAddress :address="generations[height-i+1].keyBlock.beneficiary" />
                  </RouterLink>
                </span>
                <FillDummy v-else />
              </transition>
            </td>
            <td>
                <span class="field-name">
                  time
                </span>
              <transition name="fade">
                <span
                  v-if="generations[height-i+1]"
                  class="number"
                >
                  <RelativeTime :ts="currentTime - generations[height-i+1].keyBlock.time" v-if="getAverageBlockTime" />
                </span>
                <FillDummy v-else />
              </transition>
            </td>
          </tr>
        </table>
      </div>
      <div class="center">
        <Loader v-if="isLoadingMore" />
        <AeButton
          v-else
          type="dramatic"
          @click="loadMore"
        >
          load more
        </AeButton>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { AeButton } from '@aeternity/aepp-components'
import currentTime from '../../mixins/currentTime'
import RelativeTime from '../../components/relativeTime'
import NamedAddress from '../../components/namedAddress'
import AeHash from '../../components/aeHash'
import Loader from '../../components/loader'
import FillDummy from '../../components/fillDummy'

export default {
  components: { AeButton, RelativeTime, NamedAddress, AeHash, Loader, FillDummy },
  mixins: [currentTime],
  data: function () {
    return {
      isLoadingMore: false,
      numGenerations: 4
    }
  },
  computed: {
    ...mapState('blocks', [
      'generations',
      'height'
    ]),
    ...mapGetters('blocks', [
      'getAverageBlockTime',
      'getLastMinedBlockTime'
    ])
  },
  mounted: async function () {
    this.numGenerations = 10
    this.$store.dispatch('blocks/getLatestGenerations', 10)
  },
  activated: async function () {
    this.numGenerations = 10
    this.$store.dispatch('blocks/getLatestGenerations', 10)
  },
  methods: {
    loadMore: async function () {
      this.isLoadingMore = true
      const toAdd = Math.max(Math.min(this.height - this.numGenerations, 10), 0)
      this.numGenerations += toAdd
      await this.$store.dispatch('blocks/getLatestGenerations', Object.keys(this.generations).length + toAdd)
      this.isLoadingMore = false
    }
  }
}
</script>
<style src='./generationList.scss' lang='scss'/>
