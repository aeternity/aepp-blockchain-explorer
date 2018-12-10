<template>
  <AeCard class="loader-wrapper">
    <div class="loader-info">
      <div class="loader-info__name">
        {{ name }}
      </div>
      <div class="loader-info__url">
        Connecting...
      </div>
    </div>
    <AeLoader />
  </AeCard>
</template>
<script>
import {
  AeCard,
  AeLoader
} from '@aeternity/aepp-components-3'

export default {
  name: 'LoaderItem',
  components: {
    AeCard,
    AeLoader
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import '../style/variables';
  .loader-wrapper{
    width: 100%;
    box-sizing: border-box;
    .ae-card-main{
      background-color: $white;
      padding: 15px!important;
    }
  }
</style>

<style scoped lang='scss'>
@import '../style/mixins';

 .ae-loader{
  margin: 0;
 }

.loader-info{
  &__name{
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0;
    color: #203040;
  }
  &__url{
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0;
    color: $darkGrey;
  }
  &__connect{
    color: $darkGrey;
  }
}
</style>
