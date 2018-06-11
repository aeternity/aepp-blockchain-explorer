/**
 * Component state modules
 */
import _latestBlock from './_latestBlock'
import _marketStats from './_marketStats'
import _recentBlocks from './_recentBlocks'

/**
 * Global State Modules
 */
import accounts from './accounts'
import blocks from './blocks'
import transactions from './transactions'

/**
 * Exporting Modules
 */
export default {
  _latestBlock,
  _marketStats,
  _recentBlocks,
  accounts,
  blocks,
  transactions
}
