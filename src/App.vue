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
        <router-link to='/search'>
          <img src="@/assets/search.svg" alt=""/>
        </router-link>
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
  }
}
</script>

<style>
html, body {
  margin:0;
  padding:0;
  background-color:#F5F5F5;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #311B58;
  font-size:18px;
  position:relative;
  z-index:1;
}
#app:before {
  position:absolute;
  top:0;
  left:0;
  z-index:-1;
  content:"";
  display:block;
  width:100%;
  height:80px;
  background: #311B58;

}
.number ,
.block-hash,
.block-number,
.account-address {
  font-family: 'Roboto Mono', monospace;
  font-weight:500;
}
.field-name {
  opacity:0.6;
}
.grid {
  display:flex;
}
table {
  width:100%;
}
table th {
  font-size:16px;
  font-weight:normal;
  text-align:left;
  opacity:0.6;
}
table tr td {
  padding:5px 0;
}
a {
  color:inherit;
  text-decoration:none;
}
nav {
  padding:30px 0px;
  position:absolute;
  top:0;
  width:100%;
  color:white;
}
nav >.inner >:first-child ,
nav >.inner >:last-child {
  width:250px;
}
nav >.inner >:last-child {
  text-align:right;
}
nav .inner {
  /*max-width:1040px;*/
  width:calc(100% - 40px);
  margin:0 auto;
  display:flex;
  justify-content:space-between;
}
nav .links > * {
}
nav a {
  position:relative;
  display:inline-block;
  color:inherit;
  text-decoration:none;
  font-size:18px;
  margin:0 10px;
}
nav .logo {
  display:flex;
}
nav .logo img + *{
  margin-top:-12px;
  margin-left:5px;
}
nav a.link {
  opacity:0.6;
}
nav a.router-link-exact-active {
  opacity:1.0;
}
nav a.router-link-exact-active.link:after {
  content: "";
  display:block;
  position:absolute;
  width:calc(100% - 20px);
  left:10px;
  border-top:3px solid #F7296E;
  bottom:-8px;
}
.screen {
  padding-bottom:130px;
}
nav + main > .screen > :first-child{
  padding-top:100px;
}
</style>
