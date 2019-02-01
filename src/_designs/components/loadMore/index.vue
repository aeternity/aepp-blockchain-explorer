<template>
  <div class="load-more">
    <AeButton
      face="round"
      fill="neutral"
    >
      load more
    </AeButton>
  </div>
</template>

<script>
import { AeButton } from '@aeternity/aepp-components-3'

export default {
  components: { AeButton }
}
</script>

<style scoped>
  .load-more{
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }
</style>
