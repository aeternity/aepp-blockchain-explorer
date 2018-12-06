<template>
  <div class="connect-form">
    <ae-panel title="Connect to" :closeHandler="() => $emit('close')">
      <div class="connect-form__subtitle">
        other network
      </div>
      <form
        @submit.prevent="$emit('select-network', {
          name: network.name.target.value,
          url: network.url.target.value,
          isNew: true
        })"
      >
        <ae-input
          label="Network Name"
          type="text"
          class="connect-form__input"
          v-model="network.name"
        />
        <ae-input
          label="Network url"
          type="text"
          class="connect-form__input"
          v-model="network.url"
        />
        <ae-button
          class="connect-form__btn"
          face="round"
          type="exciting"
          extend
        >Connect</ae-button>
      </form>
    </ae-panel>
  </div>
</template>

<script>
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
  data () {
    return {
      network: {
        name: '',
        url: ''
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
