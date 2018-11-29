import {BigNumber} from 'bignumber.js'

export default function (yani) {
  return new BigNumber(yani).shiftedBy(-18).toString()
}
