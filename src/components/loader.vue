<template>
  <div>
    <AeLoader />
  </div>
</template>

<script>

import { AeLoader } from '@aeternity/aepp-components'

export default {
  name: 'Loader',
  components: { AeLoader }
}
</script>

<style>
  .ae-loader {
    margin: 40%;
  }
</style>
