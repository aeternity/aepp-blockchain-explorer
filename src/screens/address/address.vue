<template>
  <div class='account-screen screen'>
    <h1 class='title'>Account</h1>
    <div class="field">
      <div class="field-name">
        Public Key
      </div>
      <div clas='account-address'>{{address}}</div>
    </div>

    <div class="field">
    <div class='field-name'>Balance</div>
    <div>
      <span class="number">{{balance}}</span>
      <span class="unit">AE</span>
    </div>

    </div>
    <!--<h2>List of Transactions:</h2>-->
  </div>
</template>
<script>
// ak$3MUyXbU7Dzf6Urgn4wnKocxG5LH4rRrrMrXXPXB9sh7BkrRhiupwxLW92zmj2KtLvABzBb76LQtQKAdos7sFyX4do3EKto
// const addressRegex = RegExp('^ak\\$[1-9A-HJ-NP-Za-km-z]{94}')
export default {
  name: 'Address',
  data () {
    return {
      balance: null
    }
  },
  computed: {
    address () {
      return this.$route.params.address
    }
  },
  methods: {
    getBalance () {
      this.$http.get('external/v2/account/balance?pub_key=' + this.address, {
        before (request) {
          if (this.previousRequest) {
            this.previousRequest.abort()
          }
          this.previousRequest = request
        }

      }).then(response => {
        this.balance = response.body.balance
      }, response => {
        // error callback
      })
    }
  },
  created () {
    this.getBalance()
  }
}
</script>
<style>
.account-screen {

}
.account-screen > * {
  max-width:1040px;
  margin:0 auto;
  width:calc(100% - 40px);
}
.account-screen .title {
  margin-top:0;
  font-size:30px;
  border-bottom:2px solid #311B58;
  padding-bottom:20px;
  margin-bottom:20px;
}
.account-screen .field{
  margin-bottom:20px;
}


</style>
