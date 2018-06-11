/**
 * Exporting default state
 */
export default {
  /**
   * Global General Details
   */
  $environment: process.env.NODE_ENV,
  $version: '0.0.0',
  $platform: 'Blockchain Explorer',
  $language: 'en',

  // TODO: Update later
  height: 0,
  // marketStats: null,
  // blocks: {},
  txs: {},
  accounts: {},
  accountNames: {},
  nodeStatus: null,
  env: process.env
}
