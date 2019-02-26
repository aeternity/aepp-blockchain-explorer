<template>
  <div class="account">
    <no-ssr><AppIdenticon
      :address="value"
      class="account-identicon"
    /></no-ssr>
    <AppDefinition
      :title="title"
    >
      <div class="account-content">
        <FormatAddress
          :value="value"
          length="responsive"
        />
        <AppIconBase
          v-if="icon"
          name="copy"
          size="18"
        />
      </div>
    </AppDefinition>
  </div>
</template>
<script>
import AppDefinition from '~/components/appDefinition'
import FormatAddress from '~/components/formatAddress'
import AppIdenticon from '~/components/AppIdenticon'
import AppIconBase from '~/components/AppIconBase'

export default {
  name: 'Account',
  components: { AppDefinition, FormatAddress, AppIdenticon, AppIconBase },
  props: {
    value: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="scss">
    .account {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: .6rem;
        @media (max-width:450px) {
          flex-direction: column;
          justify-content: start;
          align-items: start;
          padding-left: 0;
        }
        &-identicon {
          @media (max-width:450px) {
            margin-left: .6rem;
            margin-top: .3rem;
          }
        }
      &-content {
        display: flex;
          & .app-icon {
            margin-left: .3rem;
          @media (max-width:450px) {
            display: none;
          }
        }
      }
    }

</style>
