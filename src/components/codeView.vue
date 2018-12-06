<template>
  <code class="code-view">
    {{ code }}
  </code>
</template>

<script>
export default {
  name: 'CodeView',
  props: {
    code: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss'>
@import '../style/variables';

.code-view {
  display: block;
  font-family: 'Roboto Mono', monospace;
  background: lighten($black, 20);
  padding: 15px;
  max-height: 300px;
  overflow: scroll;
  color: darken($white, 10);
  width: 60vw;
  max-width: 620px;
  word-wrap: break-word;
  white-space: pre-line;
}
</style>
