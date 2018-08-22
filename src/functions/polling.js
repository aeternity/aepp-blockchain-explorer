const interval = function (action, args, ms) {
  /*
   * Dispatch first action
   */
  this.$store.dispatch(action, args)

  /*
   * Setting the interval and returning the id
   */
  return setInterval(() => this
    .$store
    .dispatch(action, args), ms)
}

export default function () {
  /*
   * List of intervals
   */
  const intervals = {}

  /*
   * Creating and object with two functions
   * that fetches and closes a poll connection
   */
  return {
    /**
     * fetch Function
     * @param action
     * @param args
     * @param ms
     * @return {Promise<*>}
     */
    fetch (action, args = null, ms = 10000) {
      if (typeof args === 'function') {
        this.$watch(args, args => (
          intervals[action] = interval.call(this, action, args, ms)
        ), { immediate: true })
      } else {
        intervals[action] = interval.call(this, action, args, ms)
      }
      return intervals[action]
    },

    /**
     * close function clears the interval
     * for the specific poll action
     * @param action
     * @param callback
     * @return {*}
     */
    close (action, callback = function () {}) {
      /*
       * If interval is undefined
       * continue with normal flow
       */
      if (!intervals[action]) return callback()

      /*
       * Clear the interval
       */
      clearInterval(intervals[action])

      /*
       * Delete reference
       */
      delete intervals[action]

      /*
       * Callback
       */
      return callback()
    }
  }
}
