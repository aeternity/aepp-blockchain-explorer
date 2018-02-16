<template>
  <div class='account-screen screen'>
    <h1 class='title'>
      <ae-identity-avatar :address="address"/>
      <ae-address size='compact' :show-avatar='false' :address='address'/>
    </h1>

    <div class="field">
      <div class='field-name'>Balance</div>
      <div>
        <span class="number">{{balance}}</span>
        <span class="unit">AE</span>
      </div>
    </div>

    <div class="field">
      <div class="field-name">
        Public Key
      </div>
      <div class='account-address'>
        <ae-address :show-avatar='false' :address='address'/>
      </div>
    </div>

    <!--<h2>List of Transactions:</h2>-->
  </div>
</template>
<script>
// ak$3MUyXbU7Dzf6Urgn4wnKocxG5LH4rRrrMrXXPXB9sh7BkrRhiupwxLW92zmj2KtLvABzBb76LQtQKAdos7sFyX4do3EKto
// const addressRegex = RegExp('^ak\\$[1-9A-HJ-NP-Za-km-z]{94}')
import {
  AeAddress,
  AeIdentityAvatar
} from '@aeternity/aepp-components'
export default {
  name: 'Address',
  components: {
    AeAddress,
    AeIdentityAvatar
  },
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
      this.$http.get('internal/v2/account/balance/' + this.address, {
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
<style src='./address.scss' lang='scss' />
