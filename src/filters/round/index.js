/**
 * Takes a number and rounds it to
 * a precision
 * @param {Number} number
 * @param {Number} precision
 * @return {number}
 */
export default function (number, precision = 2) {
  let factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}
