<template>
  <div class="contract-code">
    <ae-switch
      v-model="view"
      name="example"
      :choices="[
        { label: 'Hex', value: 'hex' },
        { label: 'Opcode', value: 'opcode' },
      ]"
      default="hex"
    />
    <code-view :code="code" />
  </div>
</template>

<script>
import { AeSwitch } from '@aeternity/aepp-components'
import CodeView from '../codeView/codeView.vue'
import numbersToString from '../../filters/numbersToString'
import aevmDisassembler from '../../filters/aevmDisassembler'

export default {
  name: 'contract-code',
  props: ['contractCode'],
  components: {
    AeSwitch,
    CodeView
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
        default: return numbersToString(this.contractCode)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';

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
