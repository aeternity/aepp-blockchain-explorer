<template>
  <span
    :class="{ big, spaced }"
    class="relative-time">
    <template v-for="(item, idx) in items">
      {{ idx ? ' ' : '' }}
      <span
        :key="`${item.unit}-number`"
        class="number">{{ item.number }}</span>
      <span
        :key="item.unit"
        class="unit">{{ item.unit }}</span>
    </template>
  </span>
</template>
<script>
export default {
  props: {
    ts: Number,
    big: Boolean,
    spaced: Boolean
  },
  computed: {
    items () {
      let t = this.ts < 0 ? 0 : this.ts
      t = Math.floor(t / 1000)
      const values = []
      values.unshift({ unit: 's', number: t % 60 })
      t = Math.floor(t / 60)
      values.unshift({ unit: 'm', number: t % 60 })
      t = Math.floor(t / 60)
      values.unshift({ unit: 'h', number: t % 24 })
      t = Math.floor(t / 24)
      values.unshift({ unit: 'd', number: t % 30 })
      t = Math.floor(t / 30)
      values.unshift({ unit: 'mo.', number: t % 12 })
      t = Math.floor(t / 12)
      values.unshift({ unit: 'y', number: t })
      while (values.length && !values[0].number) values.shift()
      return values.map((v, idx) => {
        if (!idx) return v
        return {
          unit: v.unit,
          number: String(v.number).padStart(2, '0')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/mixins';

.relative-time {
  &.big {
    .number {
      @include font-size(xxl);
      @include phone-and-tablet {
        @include font-size(xl);
      }
    }

    .unit {
      @include font-size(m);
      @include phone-and-tablet {
        @include font-size(s);
      }
    }
  }

  &.spaced {
    .unit + .number {
      margin-left: 20px;
    }
  }
}
</style>
