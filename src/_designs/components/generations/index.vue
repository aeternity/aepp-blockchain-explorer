<template>
  <AppTable class="generations">
    <slot />
  </AppTable>
</template>
<script>
import AppTable from '@/_designs/components/appTable'
export default {
  name: 'Index',
  components: { AppTable }
}
</script>

<style lang="scss" scoped>
.generations {}
</style>
