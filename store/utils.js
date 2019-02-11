export const wrapActionsWithResolvedEpoch = actions =>
  Object.entries(actions).reduce((p, [actionName, actionFunction]) => ({
    ...p,
    async [actionName] (store, ...args) {
      const storeWithResolvedEpoch = {
        ...store,
        rootGetters: {
          ...store.rootGetters,
          epoch: await store.rootGetters.epochPromise
        }
      }
      return actionFunction.call(storeWithResolvedEpoch, storeWithResolvedEpoch, ...args)
    }
  }), {})
