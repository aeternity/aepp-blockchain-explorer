<template>
  <div class="connect-form" >
    <ae-panel  :title="'Connect to'" :closeHandler="showNetwork" :ratioTop="0.1" :ratioBottom="0.6" v-if="isDisplaying ">
      <div class="connect-form__subtitle">
        other network
      </div>
      <form @submit.prevent="changeNetwork">
        <ae-input label="Network Name"
                  type="text"
                  class="connect-form__input"
                  v-model="netWorkData.name">
        </ae-input>
        <ae-input label="Network url"
                  type="text"
                  class="connect-form__input"
                  v-model="netWorkData.url">
        </ae-input>
        <ae-button class="connect-form__btn" face="round" type="exciting"  extend>Connect</ae-button>
      </form>
    </ae-panel>
    <error :name="netWorkData.name.target.value" v-if="isError" @back="closeError" @closeNetwork="showNetwork"></error>
    <loader-item :name="netWorkData.name.target.value" v-if="isNetworkChanging" ></loader-item>
  </div>

</template>
<script>
import {
  AePanel,
  AeInput,
  AeButton
} from '@aeternity/aepp-components-3'
import { mapState } from 'vuex'

import LoaderItem from './loaderItem'
import Error from './error'

export default {
  name: 'connection-form',
  components: {
    AePanel,
    AeInput,
    AeButton,
    LoaderItem,
    Error
  },
  data: function () {
    return {
      netWorkData: {
        name: '',
        url: ''
      },
      isNetworkChanging: false,
      isError: false
    }
  },
  computed: {
    ...mapState({
      connectError: 'error'
    }),
    isDisplaying () {
      return !this.isNetworkChanging && !this.isError
    }
  },
  methods: {
    closeError (e) {
      this.isError = e
    },
    async changeNetwork () {
      this.isNetworkChanging = true
      this.$store.commit('changeNetworkUrl', this.netWorkData.url.target.value)

      this.$store.commit('blocks/resetState')
      this.$store.commit('accounts/resetState')
      this.$store.commit('transactions/resetState')

      await Promise.all([
        this.$store.dispatch('blocks/height'),
        this.$store.dispatch('getNodeStatus')
      ]).then(success => {
        this.$store.commit('clearError')
        this.saveNetworkLocal()
        this.showNetwork()
      }).catch(err => {
        this.isError = true
        this.isNetworkChanging = false
        this.$store.commit('catchError', err)
      })

      this.$store.dispatch('blocks/getLatestGenerations', 10)

      if (this.connectError.length) {
        this.isError = true
      }
      this.isNetworkChanging = false
    },
    showNetwork () {
      this.$emit('netWork', false)
    },
    saveNetworkLocal () {
      if (localStorage.getItem('localNetwork')) {
        let localNetworks = JSON.parse(localStorage.getItem('localNetwork'))
        localNetworks.push({
          name: this.netWorkData.name.target.value,
          url: this.netWorkData.url.target.value
        })
        localStorage.setItem('localNetwork', JSON.stringify(localNetworks))
      } else {
        localStorage.setItem('localNetwork', JSON.stringify(
          [
            {
              name: this.netWorkData.name.target.value,
              url: this.netWorkData.url.target.value
            }
          ]
        ))
      }
    }
  }

}
</script>

<style lang="scss">
  @import '../style/variables';
  .connect-form{
    .content{
      padding: 16px!important;

      h1{
        font-size: 23px!important;
        line-height: 28px!important;
        font-family: "Inter UI";
        color: $connectBlack!important;
      }
    }

    &__input{
      margin-bottom: 8px;
      .ae-input{
        margin: 10px 0 0 0!important;
      }
    }
  }
</style>

<style scoped lang='scss'>
@import '../style/mixins';

.connect-form{
  width: 320px;
  &__subtitle{
    font-size: 23px;
    line-height: 28px;
    font-family: "Inter UI";
    color: #ff0070;
    margin-bottom: 45px;
  }

  &__input{
    margin-bottom: 8px;
    .ae-input{
      margin: 10px 0 0 0!important;
    }
  }
  &__btn{
    margin-top: 45px;
    background-color: #6948a1!important;
  }
}
</style>
