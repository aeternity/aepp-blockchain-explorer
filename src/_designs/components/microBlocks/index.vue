<template>
    <article class="micro-blocks">
      <MicroBlock/>
    </article>
</template>
<script>
  import MicroBlock from '../microBlock'

  export default {
    name: 'MicroBlocks',
    components: { MicroBlock }
  }
</script>
<style lang="scss">
    .micro-blocks {
        margin-top: 2rem;
    }

</style>
