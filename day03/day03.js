export function parseLine (line, row, numbers, symbols) {
  let currentNumber = ''

  // padding the line with a dot in case the line ends with a number
  Array.from(line + '.').forEach((char, idx) => {
    const isDigit = /\d/.test(char)
    const isSymbol = !isDigit && char !== '.'

    if (isDigit) {
      currentNumber += char
    } else if (isSymbol) {
      symbols[`${row},${idx}`] = char
    }

    if (currentNumber.length > 0 && !isDigit) {
      for (let n = idx - 1; n > idx - 1 - currentNumber.length; n--) {
        numbers[`${row},${n}`] = parseInt(currentNumber, 10)
      }
      currentNumber = ''
    }
  })
}

export function sumPartNumbers (lines) {
  return iterateSymbolsAndSum(lines, parts => {
    return Array.from(parts).reduce((acc, i) => acc + i, 0)
  })
}

export function sumAllGearRatios (lines) {
  return iterateSymbolsAndSum(lines, parts => {
    if (parts.size === 2) {
      return Array.from(parts).reduce((acc, i) => acc * i, 1)
    } else {
      return 0
    }
  })
}

function iterateSymbolsAndSum (lines, fn) {
  const numbers = {}
  const symbols = {}

  lines.forEach((line, row) => {
    parseLine(line, row, numbers, symbols)
  })

  let sum = 0

  Object.keys(symbols).forEach(key => {
    const [row, col] = key.split(',').map(n => parseInt(n, 10))
    const parts = new Set()

    const neighbours = [
            `${row - 1},${col - 1}`,
            `${row - 1},${col}`,
            `${row - 1},${col + 1}`,
            `${row},${col - 1}`,
            `${row},${col + 1}`,
            `${row + 1},${col - 1}`,
            `${row + 1},${col}`,
            `${row + 1},${col + 1}`
    ]
    neighbours.forEach(neighbour => {
      if (neighbour in numbers) {
        parts.add(numbers[neighbour])
      }
    })

    sum += fn(parts)
  })

  return sum
}
