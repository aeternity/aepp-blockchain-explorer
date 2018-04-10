const intervals = {}

export default (actionName, args) => ({
  async mounted () {
    const updateInterval = async (actionName, args) => {
      clearInterval(intervals[this._uid])
      await this.$store.dispatch(actionName, args)
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
