<template>
  <div class="account">
    <AeIdenticon
      :address="value"
      class="account-identicon"
    />
    <AppDefinition
      :title="title"
    >
      <div class="account-content">
        <FormatAddress
          :value="value"
          length="responsive"
        />
        <AeIcon
          v-if="icon"
          name="copy"
        />
      </div>
    </AppDefinition>
  </div>
</template>
<script>
import AppDefinition from '~/components/appDefinition'
import FormatAddress from '~/components/formatAddress'
import { AeIcon, AeIdenticon } from '~@aeternity/aepp-components-3'

export default {
  name: 'Account',
  components: { AppDefinition, FormatAddress, AeIcon, AeIdenticon },
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
          & .ae-icon {
            margin-left: .3rem;
          @media (max-width:450px) {
            display: none;
          }
        }
      }
    }

</style>
