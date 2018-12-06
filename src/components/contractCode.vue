<template>
  <div class="contract-code">
    <ae-switch
      v-model="view"
      :choices="[
        { label: 'Base58c', value: 'base58c' },
        { label: 'Opcode', value: 'opcode' },
      ]"
      name="example"
      default="base58c"
    />
    <code-view :code="code" />
  </div>
</template>

<script>
import { AeSwitch } from '@aeternity/aepp-components'
import CodeView from './codeView.vue'
import aevmDisassembler from '../filters/aevmDisassembler/index'

export default {
  name: 'ContractCode',
  components: {
    AeSwitch,
    CodeView
  },
  props: {
    contractCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      view: null
    }
  },
  computed: {
    code () {
      switch (this.view) {
        case 'opcode': return aevmDisassembler(this.contractCode)
        default: return this.contractCode
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

.contract-code {
  .ae-switch {
    padding-right: 20px;
    justify-content: flex-end !important;
    background: lighten($black, 10);

    /deep/ label {
      border-bottom: 3px solid lighten($black, 10) !important;
    }
  }
}
</style>
