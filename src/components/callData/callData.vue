<template>
  <div class='call-data'>
    <code-view :code='contractCode'/>
  </div>
</template>
<script>
import CodeView from '../codeView/codeView.vue'
export default {
  name: 'call-data',
  props: ['callData'],
  components: {
    CodeView
  }
}
</script>
<style lang='scss'>
.call-data {
}
</style>
