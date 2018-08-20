<template>
  <div class="named-address" v-if="address">
    <template v-if="name">
      {{ name }}
    </template>
    <ae-address :address="address" :show-avatar="false" size="compact" v-else />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { AeAddress, AeIdentityAvatar } from '@aeternity/aepp-components'

export default {
  name: 'named-address',
  props: [
    'address'
  ],
  components: {
    AeAddress,
    AeIdentityAvatar
  },
  computed: {
    ...mapGetters('accounts', [
      'getName'
    ]),
    name: function () {
      return this.getName(this.address)
    }
  },
  watch: {
    address: function (oldAddress, newAddress) {
      return this
        .$store
        .dispatch('accounts/name', newAddress)
    }
  },
  mounted () {
    return this
      .$store
      .dispatch('accounts/name', this.address)
  }
}
</script>
<style></style>
