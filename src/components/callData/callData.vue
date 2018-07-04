<template>
  <div class='call-data'>
    <code-view :code='hexCode'/>
  </div>
</template>
<script>
import CodeView from '../codeView/codeView.vue'
export default {
  name: 'call-data',
  props: ['callData'],
  components: {
    CodeView
  },
  computed: {
    hexCode () {
      return this.callData.map(d => String.fromCharCode(d)).join('')
    }
  }
}
</script>
<style lang='scss'>
.call-data {
}
</style>
