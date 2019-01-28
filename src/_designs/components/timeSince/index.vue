<template>
  <div
    class="time-wrapper"
    :class="{ header: isHeader }"
  >
    <div
      class="time-content"
      v-html="getData(time)"
    >
      {{ getData(time) }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimeSince',
  props: {
    time: {
      type: Number,
      required: true
    },
    isHeader: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getData (t) {
      let date = new Date(t).toLocaleString('en-US',
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
      return this.isHeader ? `<div class="title">${title}</div> ${time}` : date
    }
  }
}
</script>
<style scoped lang="scss">
  @import "~@aeternity/aepp-components-3/src/styles/variables/colors";
  @import '../../../style/mixins.scss';
  .time-wrapper {
    /deep/ .title {
      color: $color-neutral-negative-3;
      @include font-size(m);
    }

    .time-content {
      color: $color-neutral-negative-1;
    }
  }

  .header {
    padding: 0.6rem;
  }
</style>
