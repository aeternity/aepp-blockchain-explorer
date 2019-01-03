/**
 * Takes a string or number that is Date() compatible
 * and cconvert its to a human readable date
 * @param {String | Number} ts
 * @return {string}
 */
export default function (ts) {
  return new Date(ts).toLocaleString('en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    })
}
