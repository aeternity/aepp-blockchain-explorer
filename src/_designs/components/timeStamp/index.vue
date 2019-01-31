<template>
  <div
    class="time-stamp"
    :class="{ header: hasTitle }"
  >
    <span
      class="time-stamp-content"
      v-html="date"
    >
      {{ date }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'TimeStamp',
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
      return this.hasTitle ? `<div class="title">${title}</div> ${time} + UTC` : `${date} + UTC`
    }
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  @import "~@aeternity/aepp-components-3/src/styles/placeholders/typography";
  .time-stamp {
    /deep/ .title {
      color: $color-neutral-negative-3;
      @extend %face-sans-base;
    }

    .time-stamp-content {
      color: $color-neutral-negative-1;
      @extend %face-mono-s;
    }
  }

  .header {
    padding: 0.6rem;
  }
</style>
