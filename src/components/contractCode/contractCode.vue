<template>
  <div class='contract-code'>
    <ae-switch
      class='code-view-toggle'
      v-model='view'
      name="example"
      :choices="[
        { label: 'Hex', value: 'hex' },
        { label: 'Opcode', value: 'opcode' },
      ]"
      :default="hex"
    />
    <code-view :code="code" />
  </div>
</template>
<script>
import CodeView from '../codeView/codeView.vue'
import { AeSwitch } from '@aeternity/aepp-components'
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
<style lang='scss'>
@import '../../style/variables';

.contract-code {
  .code-view-toggle {
    padding-right:20px;
    justify-content:flex-end !important;
    background:lighten($black, 10);
    label {
      border-bottom:3px solid lighten($black, 10) !important;
    }
  }
}
</style>
