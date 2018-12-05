<template>
  <div class="connect-form">
    <ae-panel title="Connect to" :closeHandler="showNetwork">
      <div class="connect-form__subtitle">
        other network
      </div>
      <form @submit.prevent="seeChangedNetwork">
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
        <ae-button class="connect-form__btn" face="round" type="exciting" extend>Connect</ae-button>
      </form>
    </ae-panel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  AePanel,
  AeInput,
  AeButton
} from '@aeternity/aepp-components-3'

export default {
  name: 'connection-form',
  components: {
    AePanel,
    AeInput,
    AeButton
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
      connectError: 'error'
    })
  },
  methods: {
    async changeNetwork () {
      let name = this.netWorkData.name.target.value
      this.$emit('networkName', name)
      await this.$store.dispatch('changeNetwork', this.netWorkData.url.target.value)
      if (!this.connectError) {
        this.saveNetworkLocal()
      }
    },
    seeChangedNetwork () {
      this.changeNetwork()
      this.showNetwork()
    },
    saveNetworkLocal () {
      this.$store.commit('updateNetwork', {
        name: this.netWorkData.name.target.value,
        url: this.netWorkData.url.target.value,
        isLocal: true
      })
      this.showNetwork()
    },
    showNetwork () {
      this.$emit('form', false)
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

    /deep/ .content{
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

  /deep/ .connect-form__input{
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
