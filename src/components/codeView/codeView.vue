<template>
  <div v-html='code' class='code-view'/>
</template>
<script>
export default {
  name: 'code-view',
  props: ['code']
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
