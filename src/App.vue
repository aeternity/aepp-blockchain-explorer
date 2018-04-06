<template>
  <div id="app">
    <nav>
      <div class="inner">
        <router-link class='logo' to='/'>
          <img src="@/assets/header-logo.svg" alt=""/>
          <span>explorer</span>
        </router-link>
        <div class="links">
          <router-link class='link' to='/'>
            Dashboard
          </router-link>
          <router-link class='link'  to='/blocks'>
            Blocks
          </router-link>
          <router-link class='link' to='/tx'>
            Transactions
          </router-link>
        </div>
        <div>
            <span is='router-link' to='/status/' class='network-name'>{{networkName}}</span>
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
export default {
  name: 'app',
  components: {
    AeFooter: Footer
  },
  computed: {
    networkName () {
      let url = process.env.AETERNITY_EPOCH_API_URL
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
  }
}
</script>

<style src='./App.scss' lang='scss' />
