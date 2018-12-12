<template>
  <div class="app-dashboard">
    <h1>App-Dashboard</h1>
    <AppTable details>
      <AppTableRow extend>
        <AppTableRowCell title="Difficulty">
          <template slot="text">
            87472467200
          </template>
        </AppTableRowCell>
        <AppTableRowCell title="Target">
          <template slot="text">
            536930672
          </template>
        </AppTableRowCell>
      </AppTableRow>
      <AppTableRow >
        <AppTableRowCell extend title="Hash">
          <template slot="text">
            <Mono>
              kh_  25 UQc Zb8 caG m8q
              vs6 nNy KmS eSK Xya AKg
              ow5 8XL VEZ mBk Pmr L5N
            </Mono>
          </template>
        </AppTableRowCell>
      </AppTableRow>
      <AppTableRow extend>
        <AppTableRowCell title="Difficulty">
          <template slot="text">
            87472467200
          </template>
        </AppTableRowCell>
        <AppTableRowCell title="Target">
          <template slot="text">
            536930672
          </template>
        </AppTableRowCell>
      </AppTableRow>
      <AppTableRow extend>
        <AppTableRowCell title="Difficulty">
          <template slot="text">
            87472467200
          </template>
        </AppTableRowCell>
        <AppTableRowCell title="Target">
          <template slot="text">
            536930672
          </template>
        </AppTableRowCell>
      </AppTableRow>
      <AppTableRow >
        <AppTableRowCell extend title="Hash">
          <template slot="text">
            <Mono>
              kh_  25 UQc Zb8 caG m8q
              vs6 nNy KmS eSK Xya AKg
              ow5 8XL VEZ mBk Pmr L5N
            </Mono>
          </template>
        </AppTableRowCell>
      </AppTableRow>
    </AppTable>
  </div>
</template>
<script>
import AppTable from '@/_designs/components/appTable'
import AppTableRow from '@/_designs/components/appTableRow'
import AppTableRowCell from '@/_designs/components/appTableRowCell'
import Mono from '@/_designs/components/mono'

export default {
  name: 'AppDashboard',
  components: {
    AppTable,
    AppTableRow,
    AppTableRowCell,
    Mono
  }
}
</script>
<style lang="scss">
@import '../../styles/index';
.app-dashboard {}
</style>
