import { BigNumber } from 'bignumber.js'

const prefixes = {
  '-3': 'milli',
  '-6': 'micro',
  '-9': 'nano',
  '-12': 'pico',
  '-15': 'femto',
  '-18': 'atto'
}

export default function (base) {
  if (base < 10 ** 16 && base !== 0) {
    let exp = 0
    while (base > 9) {
      base = base / 10
      exp++
    }
    const extra = exp % 3
    base = new BigNumber(base).shiftedBy(extra).toNumber()
    exp = exp - 18 - extra
    return base.toString() + ' ' + prefixes[exp.toString()]
  } else {
    return new BigNumber(base).shiftedBy(-18).toNumber()
  }
}
