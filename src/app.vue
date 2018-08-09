<template>
  <div id="app">
    <nav>
      <div class="inner">
        <router-link class="logo" to="/">
          <img src="@/assets/header-logo.svg" />
          <span class="app-name">explorer</span>
        </router-link>
        <div class="links">
          <router-link class="link" to="/">
            Dashboard
          </router-link>
          <router-link class="link"  to="/generations">
            Generations
          </router-link>
          <router-link class="link" to="/tx" v-if="false">
            Transactions
          </router-link>
        </div>
        <div class="mobile-nav">
          <div class="pageName">
            <strong>{{pageName}}</strong>
          </div>
          <div class="burger" @click='toggleMenu'>
            <img src="@/assets/burger.svg" alt="" />
          </div>
          <transition name='custom-toggle-trans' enter-active-class='slide-in-top' leave-active-class='slide-in-top-out'>
            <div class="mobile-nav-fixed" v-if="isOpened">
              <div class="mobile-nav-fixed-holder">
                <div class="inner">
                  <div class="mobile-nav-fixed-action" @click='isOpened = false'>
                    <span>
                      <img src="@/assets/close.svg" alt="" />
                    </span>
                  </div>
                  <div class="mobile-nav-fixed-main-links" @click='isOpened = false'>
                    <router-link to='/'>
                      Dashboard
                    </router-link>
                    <router-link to='/generations'>
                      Generations
                    </router-link>
                    <router-link to='/tx'>
                      Transactions
                    </router-link>
                  </div>
                  <div class="mobile-nav-fixed-secondary-links">
                    <router-link to='/'>
                      imprint
                    </router-link>
                    <router-link to='/'>
                      get started
                    </router-link>
                    <router-link to='/'>
                      aeternity.com
                    </router-link>
                  </div>
                  <div class="mobile-nav-fixed-socials-links">
                    <div class="mobile-nav-fixed-socials-links-row">
                      <router-link to='/'>
                        <img src="@/assets/light/github-light.svg" alt="">
                      </router-link>
                      <router-link to='/'>
                        <img src="@/assets/light/medium-light.svg" alt="">
                      </router-link>
                      <router-link to='/'>
                        <img src="@/assets/light/telegram-light.svg" alt="">
                      </router-link>
                      <router-link to='/'>
                        <img src="@/assets/light/twitter-light.svg" alt="">
                      </router-link>
                    </div>
                    <div class="mobile-nav-fixed-socials-links-row">
                      <router-link to='/'>
                        <img src="@/assets/light/reddit-light.svg" alt="">
                      </router-link>
                      <router-link to='/'>
                        <img src="@/assets/light/slack-light.svg" alt="">
                      </router-link>
                      <router-link to='/'>
                        <img src="@/assets/light/facebook-light.svg" alt="">
                      </router-link>
                      <router-link to='/'>
                        <img src="@/assets/light/linkedin-light.svg" alt="">
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>

        </div>
        <div>
          <span v-if="env.SHOW_NETWORK_STATS" is="router-link" to="/status/" class='network-name'>
            {{ networkName }}
          </span>
          <!--<router-link to='/search'>-->
          <!--<img src="@/assets/search.svg" alt=""/>-->
          <!--</router-link>-->
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
    <ae-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  /*
   * Component name
   */
  name: 'app',

  /*
   * Data props
   */
  data () {
    return {
      isOpened: false
    }
  },

  /*
   * Computed Props
   */
  computed: {
    /*
     * Mapping env
     */
    ...mapState(['env']),

    /*
     * Network
     */
    networkName () {
      let url = this.env.AETERNITY_EPOCH_API_URL
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
    pageName () {
      return ({
        'Index': 'Dashboard',
        'GenerationList': 'Generations',
        'Transaction': 'Transactions'
      })[this.$route.name]
    }
  },
  methods: {
    toggleMenu: function () {
      this.isOpened = !this.isOpened
    }
  }
}
</script>
<style src='./app.scss' lang='scss' />
