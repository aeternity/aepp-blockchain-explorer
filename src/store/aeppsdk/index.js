/**
 * Importing Libraries
 */
import AEPPSDK from '@aeternity/aepp-sdk'

/**
 * Exporting AEPP SDK Instance
 */
export default AEPPSDK.create(process.env.AETERNITY_EPOCH_API_URL)
