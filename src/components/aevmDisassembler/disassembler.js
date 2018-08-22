/*
 * adopted from https://github.com/ethereum/remix
 * licensed under "The MIT License"
 */
import { parseCode } from './codeUtils'

// function hexConvertArray (ints) {
// var ret = '0x'
// for (var i = 0; i < ints.length; i++) {
// var h = ints[i]
// if (h) {
// ret += (h <= 0xf ? '0' : '') + h.toString(16)
// } else {
// ret += '00'
// }
// }
// return ret
// }
function hexConvert (n) {
  var ret = '0x'
  if (n) {
    ret += (n <= 0xf ? '0' : '') + n.toString(16)
  } else {
    ret += '00'
  }
  return ret
}

function hexToIntArray (hexString) {
  if (hexString.slice(0, 2) === '0x') {
    hexString = hexString.slice(2)
  }
  var integers = []
  for (var i = 0; i < hexString.length; i += 2) {
    integers.push(parseInt(hexString.slice(i, i + 2), 16))
  }
  return integers
}

var createExpressions = function (instructions) {
  var expressions = []
  var labels = 0
  for (var i = 0; i < instructions.length; i++) {
    var expr = instructions[i]
    expr.functional = false
    if (expr.name === 'JUMPDEST') {
      expr.label = 'label' + (++labels)
    } else if (expr.name.slice(0, 3) === 'DUP') {
    } else if (expr.name.slice(0, 4) === 'SWAP') {
    } else if (expr.out <= 1 && expr.in <= expressions.length) {
      var error = false
      for (var j = 0; j < expr.in && !error; j++) {
        var arg = expressions[expressions.length - j - 1]
        if (!arg.functional || arg.out !== 1) {
          error = true
          break
        }
      }
      if (!error) {
        expr.args = expressions.splice(expressions.length - expr.in)
        expr.functional = true
      }
    }
    expressions.push(expr)
  }
  return expressions
}
// c => c.toString(16)

var toString = function (expr) {
  if (expr.name.slice(0, 4) === 'PUSH') {
    return `${expr.name.toLowerCase()} ${expr.pushData.map(hexConvert).join(', ')}`
  } else if (expr.name === 'JUMPDEST') {
    return expr.label + ':'
  } else if (expr.args) {
    return expr.name.toLowerCase() + '(' + expr.args.reverse().map(toString).join(', ') + ')'
  } else {
    return expr.name.toLowerCase()
  }
}

/**
 * Disassembler that turns bytecode (as a hex string) into Solidity inline assembly.
 */
export function disassemble (input) {
  var code = parseCode(hexToIntArray(input))
  return createExpressions(code).map(toString)// .join('\n')
}
