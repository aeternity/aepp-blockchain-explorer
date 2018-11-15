import { disassemble } from './disassembler'
import numbersToString from '../numbersToString'
import { decodeBase58Check } from '@aeternity/aepp-sdk/es/utils/crypto'

export default contractCode =>
  disassemble(numbersToString(decodeBase58Check(contractCode.substr(3)))).join('\n')
