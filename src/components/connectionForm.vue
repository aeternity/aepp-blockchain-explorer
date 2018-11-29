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
        <ae-button class="connect-form__btn" face="round" type="exciting"  extend >Connect</ae-button>
      </form>
    </ae-panel>
    <error-item :name="netWorkData.name.target.value" v-if="connectError" :onTryAgain="showForm" :onCancel="showNetwork"></error-item>
    <loader-item :name="netWorkData.name.target.value" v-if="isLoading" ></loader-item>
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
import ErrorItem from './errorItem'

export default {
  name: 'connection-form',
  components: {
    AePanel,
    AeInput,
    AeButton,
    LoaderItem,
    ErrorItem
  },
  data: function () {
    return {
      netWorkData: {
        name: '',
        url: ''
      }
    }
  },
  computed: {
    ...mapState({
      url: 'epochUrl',
      isLoading: 'loading',
      connectError: 'error'
    }),
    isDisplaying () {
      return !this.isLoading && !this.connectError
    }
  },
  methods: {
    async changeNetwork () {
      await this.$store.dispatch('changeNetwork', this.netWorkData.url.target.value)
      if (!this.connectError) {
        this.saveNetworkLocal()
        this.$store.commit('closeForm')
      }
    },
    showNetwork () {
      this.$store.commit('closeForm')
      this.$store.commit('clearError')
    },
    showForm () {
      this.$store.commit('showForm')
      this.$store.commit('clearError')
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

<style scoped lang='scss'>
@import '../style/mixins';

.connect-form{
  width: 320px;

  .ae-panel{
    margin: 0 auto;

    & /deep/ .content{
      padding: 16px;

      h1{
        font-size: 23px;
        line-height: 28px;
        font-family: "Inter UI";
        color: $connectBlack;
      }
    }
  }

  &__subtitle{
    font-size: 23px;
    line-height: 28px;
    font-family: "Inter UI";
    color: #ff0070;
    margin-bottom: 45px;
  }

  & /deep/ .connect-form__input{
    margin-bottom: 8px;
    .ae-input{
      margin: 10px 0 0 0;
    }
  }
  &__btn{
    margin-top: 45px;
    background-color: #6948a1!important;
  }
}
</style>
