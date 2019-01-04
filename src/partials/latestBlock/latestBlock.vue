<template>
  <div class="latest-generation-partial">
    <div class="grid">
      <div class="explanation">
        <h2 class="title">
          Latest Generation
        </h2>
        <div class="buttons">
          <RouterLink :to="`/generation/${height}`">
            <AeButton
              type="exciting"
              size="small"
              class="buttons__link"
            >
              view last
            </AeButton>
          </RouterLink>
          <RouterLink :to="`/generations`">
            <AeButton
              type="exciting"
              size="small"
              class="buttons__link"
            >
              view all
            </AeButton>
          </RouterLink>
        </div>
      </div>
      <div class="generation-data">
        <h2>Generation</h2>
        <div class="grid generation">
          <div class="field">
            <div class="field-name">
              Height
            </div>
            <div
              v-if="generation"
              class="field-value number"
            >
              <RouterLink :to="`/generation/${height}`">
                {{ height }}
              </RouterLink>
            </div>
            <FillDummy v-else />
          </div>
          <div class="field">
            <div class="field-name">
              Micro Blocks
            </div>
            <div
              v-if="generation"
              class="field-value number"
            >
              {{ generation.microBlocks.length }}
            </div>
            <FillDummy v-else />
          </div>
          <div class="field">
            <div class="field-name">
              Transactions
            </div>
            <div
              v-if="generation"
              class="field-value number"
            >
              {{ generation.numTransactions }}
            </div>
            <FillDummy v-else />
          </div>
        </div>

        <div class="grid">
          <h2>Key Block</h2>
        </div>
        <div class="grid block-extended-info">
          <div class="field">
            <div class="field-name">
              Hash
            </div>
            <div
              v-if="generation"
              class="field-value block-hash"
            >
              <RouterLink :to="`/block/${generation.keyBlock.hash}`">
                <AeHash
                  :hash="generation.keyBlock.hash"
                  type="short"
                />
              </RouterLink>
            </div>
            <FillDummy v-else />
          </div>
          <div class="field">
            <div class="field-name">
              Beneficiary
            </div>
            <div
              v-if="generation"
              class="field-value account-address"
            >
              <RouterLink :to="`/account/${generation.keyBlock.beneficiary}`">
                <NamedAddress :address="generation.keyBlock.beneficiary" />
              </RouterLink>
            </div>
            <FillDummy v-else />
          </div>
          <div class="field">
            <div class="field-name">
              Time since mined
            </div>
            <div
              v-if="generation"
              class="field-value number"
            >
              <RelativeTime :ts="currentTime - generation.keyBlock.time" />
            </div>
            <FillDummy v-else />
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
    height: ({ height }) => height,
    generation (state) {
      return state.generations[this.height]
    }
  })
}
</script>
<style src='./latestBlock.scss' lang='scss' />
