<template>
  <span
    class="age"
  >
    <template v-for="(item, idx) in items">
      {{ idx ? ' ' : '' }}
      <span
        :key="`${item.unit}-number`"
        class="number"
      >
        {{ item.number }}
      </span>
      <span
        :key="item.unit"
        class="unit"
      >
        {{ item.unit }}
      </span>
    </template>
  </span>
</template>

<script>
import currentTime from '../../mixins/currentTime'
export default {
  name: 'Age',
  mixins: [currentTime],
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  computed: {
    items () {
      let age = this.currentTime - this.time
      let t = age < 0 ? 0 : age
      t = Math.floor(t / 1000)
      const values = []
      values.unshift({ unit: 'secs', number: t % 60 })
      t = Math.floor(t / 60)
      values.unshift({ unit: 'mins', number: t % 60 })
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

<style scoped lang="scss"></style>
