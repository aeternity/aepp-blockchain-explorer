<template>
  <div id="app">
    <nav class="app-nav">
      <div class="inner">
        <RouterLink
          class="logo"
          to="/"
        >
          <img src="@/assets/header-logo.svg">
          <span class="app-name">
            explorer
          </span>
        </RouterLink>
        <div class="links">
          <RouterLink
            class="link"
            to="/"
          >
            Dashboard
          </RouterLink>
          <RouterLink
            class="link"
            to="/generations"
          >
            Generations
          </RouterLink>
          <RouterLink
            v-if="false"
            class="link"
            to="/tx"
          >
            Transactions
          </RouterLink>
        </div>
        <div class="mobile-nav">
          <div class="pageName">
            <strong>{{ pageName }}</strong>
          </div>
          <div
            class="burger"
            @click="toggleMenu"
          >
            <img
              src="@/assets/burger.svg"
              alt=""
            >
          </div>
          <Transition
            name="custom-toggle-trans"
            enter-active-class="slide-in-top"
            leave-active-class="slide-in-top-out"
          >
            <div
              v-if="isOpened"
              class="mobile-nav-fixed"
            >
              <div class="mobile-nav-fixed-holder">
                <div class="inner">
                  <div
                    class="mobile-nav-fixed-action"
                    @click="isOpened = false"
                  >
                    <span>
                      <img
                        src="@/assets/close.svg"
                        alt=""
                      >
                    </span>
                  </div>
                  <div
                    class="mobile-nav-fixed-main-links"
                    @click="isOpened = false"
                  >
                    <RouterLink to="/">
                      Dashboard
                    </RouterLink>
                    <RouterLink to="/generations">
                      Generations
                    </RouterLink>
                    <RouterLink to="/tx">
                      Transactions
                    </RouterLink>
                  </div>
                  <div class="mobile-nav-fixed-secondary-links">
                    <RouterLink to="/">
                      imprint
                    </RouterLink>
                    <RouterLink to="/">
                      get started
                    </RouterLink>
                    <RouterLink to="/">
                      aeternity.com
                    </RouterLink>
                  </div>
                  <SocialLinks
                    light
                    hide-names
                  />
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div />
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
    <AeFooter />
    <NetworkName />
  </div>
</template>

<script>
import AeFooter from './partials/footer/footer'
import SocialLinks from './partials/socialLinks'
import NetworkName from './components/networkName'

export default {
  name: 'App',
  components: { AeFooter, SocialLinks, NetworkName },
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
