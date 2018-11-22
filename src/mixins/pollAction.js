const intervals = {}

export default (actionName, args) => ({
  async mounted () {
    const updateInterval = async (actionName, args) => {
      clearInterval(intervals[this._uid])
      this.$store.commit('checkLoading', false)
      await this.$store.dispatch(actionName, args)
      this.$store.commit('checkLoading', true)
      intervals[this._uid] = setInterval(
        () => this.$store.dispatch(actionName, args),
        10000)
    }

    if (typeof args === 'function') {
      this.$watch(
        args,
        args => updateInterval(actionName, args),
        { immediate: true })
    } else {
      await updateInterval(actionName, args)
    }
  },
  beforeDestroy () {
    clearInterval(intervals[this._uid])
    delete intervals[this._uid]
  }
})
