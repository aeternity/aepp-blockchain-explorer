<template>
  <div
    v-if="address"
    class="named-address">
    <template v-if="name">
      {{ name }}
    </template>
    <ae-address
      v-else
      :address="address"
      :show-avatar="false"
      size="compact" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { AeAddress } from '@aeternity/aepp-components'

export default {
  name: 'NamedAddress',
  components: {
    AeAddress
  },
  props: {
    address: {
      type: String,
      default: ''
    }
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
