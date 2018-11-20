<template>
  <div id="app">
    <nav class="app-nav">
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
                  <social-links light hide-names />
                </div>
              </div>
            </div>
          </transition>

        </div>
        <div />
        </div>
    </nav>
    <main>
      <router-view />
    </main>
    <ae-footer />
  </div>
</template>

<script>
import AeFooter from './partials/footer/footer'
import SocialLinks from './partials/socialLinks'

export default {
  name: 'app',
  components: { AeFooter, SocialLinks },
  data () {
    return {
      isOpened: false,
      VUE_APP_SHOW_NETWORK_STATS: process.env.VUE_APP_SHOW_NETWORK_STATS
    }
  },
  computed: {
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
