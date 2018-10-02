<template>
  <div>
    <ae-loader />
  </div>
</template>

<script>

import { AeLoader } from '@aeternity/aepp-components'

export default {
  name: 'loader',
  components: { AeLoader }
}
</script>

<style>
  .ae-loader {
    margin: 40%;
  }
</style>
