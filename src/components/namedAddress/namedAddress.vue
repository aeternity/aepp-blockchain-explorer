<template>
  <div class="named-address">
    <template v-if='name'>
      {{ name }}
    </template>
    <ae-address :address="address" :show-avatar="false" size="compact" v-else />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { AeAddress, AeIdentityAvatar } from '@aeternity/aepp-components'

export default {
  /*
   * Name
   */
  name: 'named-address',

  /*
   * Component props
   */
  props: [
    'address'
  ],

  /*
   * Components
   */
  components: {
    AeAddress,
    AeIdentityAvatar
  },

  /*
   * Computed Properties
   */
  computed: {
    /*
     * Map accounts getter for name
     */
    ...mapGetters('accounts', [
      'getName'
    ]),

    /*
     * Computed prop for name
     */
    name: function () {
      return this.getName(this.address)
    }
  },

  /*
   * Watch for property changes
   */
  watch: {
    address: function (oldAddress, newAddress) {
      return this
      .$store
      .dispatch('accounts/name', newAddress)
    }
  },

  /*
   * When mounted pull the account name
   */
  mounted () {
    return this
    .$store
    .dispatch('accounts/name', this.address)
  }
}
</script>
<style></style>
