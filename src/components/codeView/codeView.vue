<template>
  <div class='code-view'>
    {{codeHex}}
  </div>
</template>
<script>
export default {
  name: 'code-view',
  props: ['code'],
  computed: {
    codeHex () {
      //return '0x' + this.code.map(c => c.toString(16)).join('')
      //return this.code.map(c => c.toString())
      //return this.code
      return this.code.map(d => String.fromCharCode(d)).join('')
    }
  }
}
</script>
<style lang='scss'>
.code-view {
  font-family: 'Roboto Mono', monospace;
  background:lighten($black, 20);
  padding:15px;
  max-height:300px;
  overflow:scroll;
  color:darken($white, 10);
  width:60vw;
  max-width:620px;
  word-wrap:break-word;
}
</style>
