import {BigNumber} from 'bignumber.js'

const prefixes = {
  '-3': 'milli',
  '-6': 'micro',
  '-9': 'nano',
  '-12': 'pico',
  '-15': 'femto',
  '-18': 'atto',
  '-21': 'zepto',
  '-24': 'yocto'
}

export default function (yani) {
  let base = new BigNumber(yani).shiftedBy(-18).toNumber()
  if (base < 10 ** -2) {
    base = base * 10 ** 24
    let exp = 0
    while (base > 9) {
      base = base / 10
      exp++
    }
    const extra = exp % 3
    base = base * 10 ** extra
    base = Math.round(base * 100) / 100
    exp = exp - 24 - extra
    return base.toString() + ' ' + prefixes[exp.toString()]
  }
  return base
}
