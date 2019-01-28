<template>
  <div>
    <span
      is="router-link"
      v-if="VUE_APP_SHOW_NETWORK_STATS"
      to="/status/"
      class="network-name"
    >
      <span v-if="connectionStatus">
        {{ networkName }}
      </span>
      <span v-else>
        <span
          class="disabled-text"
        >
          Connecting...
        </span>
        <AeLoader />
      </span>
    </span>
  </div>
</template>

<script>
import { AeLoader } from '@aeternity/aepp-components'

export default {
  components: { AeLoader },
  data () {
    return {
      VUE_APP_SHOW_NETWORK_STATS: process.env.VUE_APP_SHOW_NETWORK_STATS
    }
  },
  computed: {
    networkName () {
      let url = this.$store.state.epochUrl
      let name = url.replace(/(?:http(?:s)?:)?\/\/([^.]+).*/, '$1')
      if (name) {
        let shortname = name.replace(/([^.]+)-net-api/, '$1')
        if (shortname) {
          return `${shortname} network`
        }
        return name
      }
      return url
    },
    connectionStatus () {
      return this.$store.getters.isConnected
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/mixins.scss';

.network-name {
  text-transform:uppercase;
  position:fixed;
  top: 30px;
  right:20px;
  color: $white;
  @include font-size(xs);
  font-weight:500;
  padding:5px 7px;
  background: #F7296E;
  border-radius: 5px;

  @include only-phone {
    width:100%;
    top: auto;
    bottom:0;
    left:0;
    border-radius:0;
    padding:15px 0;
    margin:0;
    text-align:center;
    z-index:1;
  }
}

.ae-loader {
  margin: 0% !important;
  border: .2em solid rgb(255, 255, 255) !important;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
}

span {
  display: inline-block;
}
.disabled-text {
  margin-right: 2em;
}
</style>
