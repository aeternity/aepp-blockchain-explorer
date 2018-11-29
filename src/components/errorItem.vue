<template>
  <ae-card class="error-wrapper">
    <div class="error-wrapper__message">
      Unable to connect to {{name}}
    </div>
    <ae-toolbar slot="footer" class="error-actions">
      <ae-button class="error-actions__btn" face="flat"  @click="onTryAgain()">try again</ae-button>
      <ae-filter-separator/>
      <ae-button class="error-actions__btn" face="flat" @click="onCancel()">cancel</ae-button>
    </ae-toolbar>
  </ae-card>
</template>
<script>
import {
  AeCard,
  AeToolbar,
  AeButton,
  AeFilterSeparator
} from '@aeternity/aepp-components-3'

export default {
  name: 'error-item',
  props: {
    name: String,
    onTryAgain: Function,
    onCancel: Function
  },
  components: {
    AeCard,
    AeToolbar,
    AeButton,
    AeFilterSeparator
  }
}
</script>

<style scoped lang='scss'>
@import '../style/mixins';
.error-wrapper{
  & /deep/ .ae-card-main{
    padding: 0;
  }

  &__message{
    width: 100%;
    box-sizing: border-box;
    padding: 22px;
    text-align: center;
    color: $error;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0;
    font-family: "Inter UI";
    font-weight: 500;
    background-color: $white;
  }
  .error-actions{
    &__btn{
      text-transform: uppercase;
      font-size: 11px;
      line-height: 16px;
      letter-spacing: 1.1px;
      color: $darkGrey;
      font-weight: 500;
      font-family: "Inter UI";
    }

    & /deep/ .ae-button{
      height: 100%;
    }

    .ae-filter-separator{
      height: 15px;
      width: 3px;
    }
  }
}
</style>
