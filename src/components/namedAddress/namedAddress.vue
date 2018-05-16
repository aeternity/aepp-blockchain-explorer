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
  mapState,
  mapActions
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
  watch: {
    address (oldAddr, newAddr) {
      this.fetchAccountName(this.address)
    }
  },
  methods: mapActions([
    'fetchAccountName'
  ]),
  computed: {
    ...mapState({
      name (state) {
        if (!state.accountNames[this.address]) return
        return state.accountNames[this.address].name
      }
    })
  },
  mounted () {
    this.fetchAccountName(this.address)
  }
}
</script>
<style>
</style>
