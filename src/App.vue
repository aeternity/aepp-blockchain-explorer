<template>
  <div id="app">
    <nav>
      <div class="inner">
        <router-link class='logo' to='/'>
          <img src="@/assets/header-logo.svg" alt="" />
          <span class="app-name">explorer</span>
        </router-link>
        <div class="links">
          <router-link class='link' to='/'>
            Dashboard
          </router-link>
          <router-link class='link' to='/blocks'>
            Blocks
          </router-link>
          <router-link class='link' to='/tx'>
            Transactions
          </router-link>
        </div>
        <div class="mobile-nav">
          <div class="pageName">
            <strong v-if="$route.name === 'Index'">Dashboard</strong>
            <strong v-if="$route.name === 'BlockList'">Blocks</strong>
            <strong v-if="$route.name === 'Transactions'">Transactions</strong>
          </div>
          <div class="burger" @click='expandMenu'>
            <img src="@/assets/burger.svg" alt="" />
          </div>
          <div class="mobile-nav-fixed" :class="{ active: isOpened}">
            <div class="mobile-nav-fixed-holder">
              <div class="inner">
                <div class="mobile-nav-fixed-action">
                  <span @click='expandMenu'>
                    <img src="@/assets/close.svg" alt="" />
                  </span>
                </div>
                <div class="mobile-nav-fixed-main-links">
                  <router-link to='/'>
                    Dashboard
                  </router-link>
                  <router-link to='/blocks'>
                    Blocks
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
                      <img src="@/assets/github.svg" alt="">
                    </router-link>
                    <router-link to='/'>
                      <img src="@/assets/github.svg" alt="">
                    </router-link>
                    <router-link to='/'>
                      <img src="@/assets/github.svg" alt="">
                    </router-link>
                    <router-link to='/'>
                      <img src="@/assets/github.svg" alt="">
                    </router-link>
                  </div>
                  <div class="mobile-nav-fixed-socials-links-row">
                    <router-link to='/'>
                      <img src="@/assets/github.svg" alt="">
                    </router-link>
                    <router-link to='/'>
                      <img src="@/assets/github.svg" alt="">
                    </router-link>
                    <router-link to='/'>
                      <img src="@/assets/github.svg" alt="">
                    </router-link>
                    <router-link to='/'>
                      <img src="@/assets/github.svg" alt="">
                    </router-link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div>
          <span v-if='env.SHOW_NETWORK_STATS' is='router-link' to='/status/' class='network-name'>{{networkName}}</span>
          <!--<router-link to='/search'>-->
          <!--<img src="@/assets/search.svg" alt=""/>-->
          <!--</router-link>-->
        </div>
      </div>
    </nav>
    <main>
      <router-view/>
    </main>
    <ae-footer />
  </div>
</template>



<script>
import Footer from '@/partials/footer/footer.vue'
import {mapState} from 'vuex'
export default {
  name: 'app',
  components: {
    AeFooter: Footer
  },
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    ...mapState(['env']),
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
    }
  },
  methods: {
    expandMenu: function () {
      console.log('in')
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style src='./App.scss' lang='scss' />


