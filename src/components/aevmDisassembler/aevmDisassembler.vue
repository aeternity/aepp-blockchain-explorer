<template>
  <div class='aevm-disassembler'>
    <code-view :code='disassembledCode'/>
  </div>
</template>
<script>
import CodeView from '../codeView/codeView.vue'

import { disassemble } from './disassembler.js'
export default {
  name: 'aevm-disassembler',
  props: ['contractCode'],
  components: {
    CodeView
  },
  computed: {
    codeHex () {
      return this.contractCode.map(d => String.fromCharCode(d)).join('')
    },
    disassembledCode () {
      return disassemble(this.codeHex).join('<br/>')
    }
  }
}
</script>
<style lang='scss'>
.aevm-disassembler {
}
</style>
