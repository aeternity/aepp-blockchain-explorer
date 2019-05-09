export const wrapActionsWithResolvedNode = actions =>
  Object.entries(actions).reduce((p, [actionName, actionFunction]) => ({
    ...p,
    async [actionName] (store, ...args) {
      const storeWithResolvedNode = {
        ...store,
        rootGetters: {
          ...store.rootGetters,
          node: await store.rootGetters.nodePromise
        }
      }
      return actionFunction.call(storeWithResolvedNode, storeWithResolvedNode, ...args)
    }
  }), {})
