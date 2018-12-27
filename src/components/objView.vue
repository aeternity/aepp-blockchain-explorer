<template>
  <div class="obj-view">
    {{ JSON.stringify(obj, null, '\t') }}
  </div>
</template>

<script>
export default {
  name: 'ObjView',
  props: {
    obj: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='scss'>
@import '../style/variables';
@import '../style/mixins';

  .obj-view {
    background: lighten($black, 20);
    padding: 15px;
    color: darken($white, 10);
    word-wrap: break-word;
    white-space: pre;
    @include font-size(m);
    overflow-x: auto;
  }

</style>
