export function parseLine (line) {
  const [head, tail] = line.split(':')

  const id = parseInt(head.match(/\d+/)[0], 10)
  const reveals = tail.split(';').map(part => {
    const red = extractColor(part, 'red')
    const green = extractColor(part, 'green')
    const blue = extractColor(part, 'blue')
    return { red, green, blue }
  })
  return { id, reveals }
}

function extractColor (part, color) {
  const regex = new RegExp(`\\d{1,2} ${color}`)
  if (part.search(regex) !== -1) {
    return parseInt(part.match(regex)[0].slice(0, -1 * ` ${color}`.length), 10)
  } else {
    return 0
  }
}

export function sumOfPossibleGames (lines) {
  return lines
    .map(line => parseLine(line))
    .filter((game) => {
      const [maxRed, maxGreen, maxBlue] = maxCubes(game)
      return maxRed <= 12 && maxGreen <= 13 && maxBlue <= 14
    })
    .reduce((acc, i) => acc + i.id, 0)
}

export function sumOfPowerOfGames (lines) {
  return lines
    .map(line => parseLine(line))
    .map((game) => {
      const [maxRed, maxGreen, maxBlue] = maxCubes(game)
      return maxRed * maxGreen * maxBlue
    })
    .reduce((acc, i) => acc + i, 0)
}

function maxCubes (game) {
  const maxRed = Math.max(...game.reveals.map(reveal => reveal.red))
  const maxGreen = Math.max(...game.reveals.map(reveal => reveal.green))
  const maxBlue = Math.max(...game.reveals.map(reveal => reveal.blue))

  return [maxRed, maxGreen, maxBlue]
}
