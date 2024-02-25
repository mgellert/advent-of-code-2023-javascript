export function countStepsToFarthest (lines, tileS) {
  const diagram = lines.map(line => line.split(''))

  const start = findStart(diagram)

  let current = start
  let next = getNextFromStart(start, tileS)
  let steps = 0

  while (next.x !== start.x || next.y !== start.y) {
    ([next, current] = step(diagram, tileS, current, next))
    steps++
  }

  if (steps % 2 === 0) {
    return steps / 2
  } else {
    return (steps + 1) / 2
  }
}

function findStart (diagram) {
  for (let y = 0; y < diagram.length; y++) {
    for (let x = 0; x < diagram[y].length; x++) {
      if (diagram[y][x] === 'S') {
        return { x, y }
      }
    }
  }
}

function step (diagram, tileS, prev, current) {
  let tilePrev = diagram[prev.y][prev.x]
  if (tilePrev === 'S') {
    tilePrev = tileS
  }
  const tileCurrent = diagram[current.y][current.x]

  const delta = getDelta(tileCurrent, { y: prev.y - current.y, x: prev.x - current.x })

  return [{ y: current.y + delta.y, x: current.x + delta.x }, current]
}

function getDelta (tileCurrent, diff) {
  if (tileCurrent === '|') {
    return { y: diff.y * -1, x: diff.x }
  } else if (tileCurrent === '-') {
    return { y: diff.y, x: diff.x * -1 }
  } else if (tileCurrent === 'L') {
    if (diff.y === -1) {
      return { y: 0, x: 1 }
    } else {
      return { y: -1, x: 0 }
    }
  } else if (tileCurrent === 'J') {
    if (diff.y === -1) {
      return { y: 0, x: -1 }
    } else {
      return { y: -1, x: 0 }
    }
  } else if (tileCurrent === 'F') {
    if (diff.y === 1) {
      return { y: 0, x: 1 }
    } else {
      return { y: 1, x: 0 }
    }
  } else if (tileCurrent === '7') {
    if (diff.y === 1) {
      return { y: 0, x: -1 }
    } else {
      return { y: 1, x: 0 }
    }
  }
}

function getNextFromStart (start, tileS) {
  if (tileS === 'F' || tileS === '7') {
    return { y: start.y + 1, x: start.x }
  }
}
