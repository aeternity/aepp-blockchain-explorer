<template>
  <div
    class="time-stamp"
    :class="{ header: hasTitle }"
  >
    <AeText
      face="mono-s"
      class="time-content"
      v-html="date"
    >
      {{ date }}
    </AeText>
  </div>
</template>
<script>
import { AeText } from '@aeternity/aepp-components-3'
export default {
  name: 'TimeStamp',
  components: {
    AeText
  },
  props: {
    time: {
      type: Number,
      required: true
    },
    hasTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    date () {
      let date = new Date(this.time).toLocaleString('en-US',
        {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        })
      let title = date.split(',').slice(0, 2).join('')
      let [, , time] = date.split(',')
      date = date.replace(/,/g, '')
      return this.hasTitle ? `<div class="title">${title}</div> ${time}` : date
    }
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "~@aeternity/aepp-components-3/src/styles/placeholders/typography";
  @import '../../../style/mixins.scss';
  .time-stamp {
    /deep/ .title {
      color: $color-neutral-negative-3;
      @extend %face-sans-base;
    }

    .time-content {
      color: $color-neutral-negative-1;
    }
  }

  .header {
    padding: 0.6rem;
  }
</style>
