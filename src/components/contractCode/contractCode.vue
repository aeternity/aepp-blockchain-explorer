<template>
  <div class='contract-code'>
    <code-view :code='contractCode'/>
  </div>
</template>
<script>
import CodeView from '../codeView/codeView.vue'
export default {
  name: 'contract-code',
  props: ['contractCode'],
  components: {
    CodeView
  }
}
</script>
<style lang='scss'>
.contract-code {
}
</style>
