<template>
  <div class="app-dashboard">
    <h1>App-Dashboard</h1>
    <AppTable>
      <AppTableRow>
        <template slot="title">
          Difficulty
        </template>
        <template slot="text">
          87472467200
        </template>
      </AppTableRow>
      <AppTableRow>
        <template slot="title">
          Target
        </template>
        <template slot="text">
          536930672
        </template>
      </AppTableRow>
      <AppTableRow extend>
        <template slot="title">
          Hash
        </template>
        <template slot="text">
          <Mono>
            kh_  25 UQc Zb8 caG m8q
            vs6 nNy KmS eSK Xya AKg
            ow5 8XL VEZ mBk Pmr L5N
          </Mono>
        </template>
      </AppTableRow>
    </AppTable>
  </div>
</template>
<script>
import AppTable from '@/_designs/components/appTable'
import AppTableRow from '@/_designs/components/appTableRow'
import Mono from '@/_designs/components/mono'

export default {
  name: 'AppDashboard',
  components: {
    AppTable,
    AppTableRow,
    Mono
  }
}
</script>
<style lang="scss">
@import '../../styles/index';
.app-dashboard {}
</style>
