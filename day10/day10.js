import { Point } from '../common/common'

export function countStepsToFarthest (lines, startTile) {
  const diagram = lines.map(line => line.split(''))

  const start = findStart(diagram)
  diagram[start.y][start.x] = startTile

  let current = start
  let next = getNextFromStart(diagram, start)
  let steps = 0

  while (!start.equals(next)) {
    ([next, current] = step(diagram, current, next))
    steps++
  }

  if (steps % 2 === 0) {
    return steps / 2
  } else {
    return (steps + 1) / 2
  }
}

export function countEnclosedTiles (lines, startTile) {
  const diagram = lines.map(line => line.split(''))

  const start = findStart(diagram)
  diagram[start.y][start.x] = startTile

  let current = start
  let next = getNextFromStart(diagram, start)

  const pipe = new Set()
  pipe.add(current.toString())

  while (!start.equals(next)) {
    ([next, current] = step(diagram, current, next))
    pipe.add(current.toString())
  }

  let enclosedCount = 0

  for (let y = 0; y < diagram.length; y++) {
    let inside = false
    let encounteredF = false
    let encounteredL = false
    for (let x = 0; x < diagram[y].length; x++) {
      const item = (pipe.has(new Point(x, y).toString()) && diagram[y][x]) || '.'
      if (item === '|') {
        inside = !inside
      } else if (item === 'F') {
        encounteredF = true
      } else if (item === 'L') {
        encounteredL = true
      } else if (item === 'J' && encounteredF) {
        inside = !inside
        encounteredF = false
      } else if (item === '7' && encounteredF) {
        encounteredF = false
      } else if (item === '7' && encounteredL) {
        inside = !inside
        encounteredL = false
      } else if (item === 'J' && encounteredL) {
        encounteredL = false
      } else if (inside && item !== '-') {
        enclosedCount++
      }
    }
  }
  return enclosedCount
}

function findStart (diagram) {
  for (let y = 0; y < diagram.length; y++) {
    for (let x = 0; x < diagram[y].length; x++) {
      if (diagram[y][x] === 'S') {
        return new Point(x, y)
      }
    }
  }
}

function step (diagram, prev, current) {
  const delta = getDelta(diagram, prev, current)
  return [current.add(delta), current]
}

function getDelta (diagram, prev, current) {
  const tileCurrent = diagram[current.y][current.x]
  const diff = current.subtract(prev)

  if (tileCurrent === '|') {
    return new Point(diff.x, diff.y * -1)
  } else if (tileCurrent === '-') {
    return new Point(diff.x * -1, diff.y)
  } else if (tileCurrent === 'L') {
    if (diff.y === -1) {
      return new Point(1, 0)
    } else {
      return new Point(0, -1)
    }
  } else if (tileCurrent === 'J') {
    if (diff.y === -1) {
      return new Point(-1, 0)
    } else {
      return new Point(0, -1)
    }
  } else if (tileCurrent === 'F') {
    if (diff.y === 1) {
      return new Point(1, 0)
    } else {
      return new Point(0, 1)
    }
  } else if (tileCurrent === '7') {
    if (diff.y === 1) {
      return new Point(-1, 0)
    } else {
      return new Point(0, 1)
    }
  }
}

function getNextFromStart (diagram, start) {
  const tileS = diagram[start.y][start.x]
  if (tileS === 'F' || tileS === '7') {
    return new Point(start.x, start.y + 1)
  } else {
    throw new Error('Not implemented yet')
  }
}
