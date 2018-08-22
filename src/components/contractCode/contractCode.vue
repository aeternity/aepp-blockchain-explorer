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
    <code-view v-if='view === "hex"' :code='hexCode'/>
    <aevm-disassembler v-if='view === "opcode"' :contractCode='contractCode'/>
  </div>
</template>
<script>
import CodeView from '../codeView/codeView.vue'
import { AeSwitch } from '@aeternity/aepp-components'
import AevmDisassembler from '../aevmDisassembler/aevmDisassembler.vue'
export default {
  name: 'contract-code',
  props: ['contractCode'],
  components: {
    AeSwitch,
    CodeView,
    AevmDisassembler
  },
  data () {
    return {
      view: null
    }
  },
  computed: {
    hexCode () {
      return this.contractCode.map(d => String.fromCharCode(d)).join('')
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
