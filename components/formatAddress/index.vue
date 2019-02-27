<template>
  <div
    ref="address"
    :class="[ length ]"
    :title="value"
    class="format-address"
  >
    <template v-if="length === 'responsive'">
      <span class="first-chunk">
        <span
          v-for="chunk in chunked.slice(0, 3)"
          :key="chunk"
        >
          {{ chunk }}
        </span>
      </span>
      <span class="middle-chunk">
        ...
      </span>
      <span class="last-chunk">
        <span
          v-for="chunk in chunked.slice(15, 18)"
          :key="chunk"
        >
          {{ chunk }}
        </span>
      </span>
    </template>
    <template v-else>
      <span
        v-for="chunk in chunked"
        :key="chunk.id"
      >
        {{ chunk }}
      </span>
    </template>
    <div
      v-copy-to-clipboard="value"
      v-remove-spaces-on-copy
      v-if="icon"
      class="format-address-clipboard"
    >
      <AppIcon name="copy"/>
    </div>
  </div>
</template>
<script>
import AppIcon from '~/components/appIcon'
export default {
  name: 'FormatAddress',
  components: {
    AppIcon
  },
  props: {
    value: {
      type: String,
      required: true
    },
    length: {
      type: String,
      default: 'full'
    },
    enableCopyToClipboard: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    copyToClipboard () {
      return this.enableCopyToClipboard ? this.value : false
    },
    chunked () {
      return this.value.match(/^\w{2}_|.{2}(?=.{47,48}$)|.{2,3}/g)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "~@aeternity/aepp-components-3/src/styles/placeholders/typography";
  .format-address {
    color: inherit;
    font-family: inherit;
    display: flex;
    font-size: inherit;
    word-break: normal;
    position: relative;
  }
  .format-address.full{
    flex-wrap: wrap;
    & span {
      min-width: 2.7em;
    }
  }
  .format-address-clipboard {
    display: flex;
    & .app-icon {
      margin-left: .3rem;
      /*@media (max-width:450px) {*/
        /*display: none;*/
      /*}*/
    }
    &.v-copied-to-clipboard:before {
      @extend %face-mono-base;
      content: 'address copied';
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      color: $color-neutral-negative-3;
      background: rgba($color-neutral-positive-1, 0.9);
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
  }
  .first-chunk {
    & span:nth-child(3) {
      @media (max-width: 1024px) {
        display: none;
      }
    }
    & span:nth-child(2) {
      @media (max-width: 450px) {
        margin-left: -.5rem;
      }
    }
    & span:nth-child(3) {

    }
  }
  .middle-chunk {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
  }
  .last-chunk {
    & span:nth-child(1) {
      @media (max-width: 1024px) {
        display: none;
      }
     }
    & span:nth-child(2) {
      @media (max-width: 600px) {
        display: none;
      }

    }
  }

</style>
