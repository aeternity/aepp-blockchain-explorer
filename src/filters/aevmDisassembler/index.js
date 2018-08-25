import { disassemble } from './disassembler'
import numbersToString from '../numbersToString'

export default contractCode => disassemble(numbersToString(contractCode)).join('\n')
