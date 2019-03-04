// replacement for lodash times function in vanilla ES5
export const times = (count, func) => {
  let i = 0
  let per
  let results = []
  count = count || 0
  func = func || function () {}

  // while i is less than len
  while (i < count) {
    per = i / count

    // call function with a custom api that can be
    // used via the this keyword
    results.push(func.call({
      i: i,
      count: count,
      per: per,
      bias: 1 - Math.abs(0.5 - per) / 0.5,
      results: results
    }, i, count, per))
    i += 1
  }
  return results
}
