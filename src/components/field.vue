<template>
  <div class="field">
    <div
      v-if="name"
      class="field-name">{{ name }}</div>
    <div class="field-value">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Field',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang='scss'>
@import '../style/mixins';

.field {
  display: block;
  padding:8px 0;
}
.field-name {
  @include font-size(xs);
  color: inherit;
  &:first-letter{
    text-transform: uppercase;
  }

}
.field-value {
  @include font-size(m);
  font-family:'Roboto Mono', monospace;
  font-weight:500;
  display:flex;
  vertical-align:middle;
}
.field-value > a {
  color:$magaenta;
}
</style>
