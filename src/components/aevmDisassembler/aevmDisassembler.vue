<template>
  <div class='aevm-disassembler'>
    <code-view :code='contractCode | aevmDisassembler'/>
  </div>
</template>
<script>
import CodeView from '../codeView/codeView.vue'
import aevmDisassembler from '../../filters/aevmDisassembler'

export default {
  name: 'aevm-disassembler',
  props: ['contractCode'],
  components: {
    CodeView
  },
  filters: { aevmDisassembler }
}
</script>
<style lang='scss'>
.aevm-disassembler {
}
</style>
