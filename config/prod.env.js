'use strict'
module.exports = {
  NODE_ENV: '"production"',
  AETERNITY_EPOCH_API_URL : `"${process.env.AETERNITY_EPOCH_API_URL || '//test-net-api.aepps.com/api/'}"`,
  SHOW_MARKET_STATS: process.env.SHOW_MARKET_STATS || true,
  SHOW_NETWORK_STATS: process.env.SHOW_NETWORK_STATS || true,
  NAME_LOOKUP_MIDDLEWARE_URL: process.env.NAME_LOOKUP_MIDDLEWARE_URL || false

}
