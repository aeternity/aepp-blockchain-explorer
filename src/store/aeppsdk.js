import Chain from '@aeternity/aepp-sdk/es/chain/epoch'
/* import Tx from '@aeternity/aepp-sdk/es/tx/epoch'
import Contract from '@aeternity/aepp-sdk/es/ae/contract'
import Account from '@aeternity/aepp-sdk/es/account/memory' */

// TODO: delete after SDK doesn't require a valid keyPair for Contrac
// import { generateKeyPair } from '@aeternity/aepp-sdk/es/utils/crypto'

let client = null

/* const AeClient = Chain
 .compose(Tx)
.compose(Contract)
 .compose(Account)
 .debugSwagger(true)

const ae = function (url = process.env.VUE_APP_EPOCH_URL) {
  return AeClient({
    url,
    keypair: generateKeyPair()
  })
} */

/**
 * getEpochClient
 * @param {string} epochUrl
 * @returns EpochChain instance
 *
 * Todo: Find better place than current file
 */
export const getEpochClient = async (epochUrl = process.env.VUE_APP_EPOCH_URL) => {
  if (!client) {
    client = await Chain({
      url: epochUrl
    })
  }
  return client
}

export const resetClient = () => {
  client = null
}

// export default ae
