<template>
  <ul class="format-pow">
    <li
      v-for="pow in value"
      :key="pow.id"
    >
      {{ pow }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FormatPow',
  props: {
    value: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .format-pow {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.9375rem;
    line-height: 1.4em;
    & > li {
      text-align: right;
      min-width: 6.3em;
    }
  }
</style>
