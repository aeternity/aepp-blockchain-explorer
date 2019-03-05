import BigNumber from 'bignumber.js'
// const MAGNITUDE = 18
// const MAGNITUDE_EXA = 18
// const MAGNITUDE_PETA = 15
// const MAGNITUDE_GIGA = 9
// const MAGNITUDE_MICRO = -6
// const MAGNITUDE_PICO = -12
// const MAGNITUDE_ATTO = -18
//
// const prefixes = [
//   { name: 'Exa', magnitude: MAGNITUDE_EXA },
//   { name: 'Peta', magnitude: MAGNITUDE_PETA },
//   { name: 'Giga', magnitude: MAGNITUDE_GIGA },
//   { name: '', magnitude: 0 },
//   { name: 'Micro', magnitude: MAGNITUDE_MICRO },
//   { name: 'Pico', magnitude: MAGNITUDE_PICO },
//   { name: 'Atto', magnitude: MAGNITUDE_ATTO }
// ]
//
// const getNearestPrefix = exponent => prefixes.reduce((p, n) => (
//   Math.abs(n.magnitude - exponent) < Math.abs(p.magnitude - exponent) ? n : p))
//
// const getLowerBoundPrefix = exponent => prefixes
//   .find(p => p.magnitude <= exponent) || prefixes[prefixes.length - 1]
//
// export default (value) => {
//   const { name, magnitude } = (value.e < 0 ? getNearestPrefix : getLowerBoundPrefix)(value.e)
//   const v = parseInt(value)
//   new BigNumber(v).shiftedBy(-magnitude).toFixed(8)
//   return `${v}${name ? ' ' : ''}${name}`
// }

const prefixes = {
  '-3': 'milli',
  '-6': 'micro',
  '-9': 'nano',
  '-12': 'pico'
}

export default function (base) {
  if (base < 10 ** 16 && (base !== '0' || base !== 0)) {
    let exp = 0
    while (base > 9) {
      base = base / 10
      exp++
    }
    const extra = exp > 6 ? exp % 3 : exp - 6
    base = new BigNumber(base).shiftedBy(extra).toNumber()
    exp = exp - 18 - extra
    return base.toString() + ' ' + prefixes[exp.toString()]
  } else {
    return new BigNumber(base).shiftedBy(-18).toString() + '\xa0'
  }
}
