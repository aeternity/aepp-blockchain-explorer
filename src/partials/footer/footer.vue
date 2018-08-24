<template>
  <footer class='footer'>
    <div class="inner grid">
      <div>
        <div>
          <img class='logo' src="@/assets/logo-extended.svg" alt="" />
        </div>
        <p class='claim'>Scalable smart contracts interfacing with real world data</p>
      </div>
      <div>
        <a href="https://aeternity.com/" target="_blank">aeternity.com</a>
        <a href="https://www.aepps.com/imprint/" target="_blank">Imprint</a>
        <a href="https://www.aepps.com/get-started-with-ae/" target="_blank">Get started</a>
      </div>
      <social-links />
    </div>
  </footer>
</template>

<script>
import SocialLinks from '../socialLinks/socialLinks'

export default {
  components: { SocialLinks }
}
</script>

<style src='./footer.scss' lang='scss' />
