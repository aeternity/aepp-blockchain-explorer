<template>
  <div class="named-address">
    <template v-if='address'>
      <template v-if='name'>
        {{name}}
      </template>
      <ae-address v-else size='compact' :show-avatar='false' :address='address'/>
    </template>
  </div>
</template>
<script>
import {
  mapState
} from 'vuex'
import {
  AeAddress,
  AeIdentityAvatar
} from '@aeternity/aepp-components'
export default {
  name: 'named-address',
  props: ['address'],
  components: {
    AeAddress,
    AeIdentityAvatar
  },
  computed: {
    ...mapState({
      name (state) {
        return state.accountNames[this.address]
      }
    })
  }
}
</script>
<style>
</style>
