<template>
  <section class="micro-block">
    hello
  </section>
</template>
<script>
export default {
  name: 'MicroBlock'
}
</script>
<style lang="scss">
    .micro-block {
        margin-bottom: 1rem;
        &:not(:last-child) {
            &:after {
                content: '';
                display: block;
                width: 2px;
                height: 2rem;
                background-color: #76818c;
            }
        }
    }
</style>
