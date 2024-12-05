import { Point } from '../common/common'

export function maxEnergizedTiles (lines) {
  const tiles = lines.map(line => line.split(''))
  let max = 0

  for (let y = 0; y < lines.length; y++) {
    const initialBeam = {
      start: new Point(0, y),
      end: searchRight(new Point(0, y), tiles, false),
      direction: 'right'
    }

    const done = fillTilesWithBeams(tiles, initialBeam)
    const energized = countEnergized(tiles, done)
    if (energized > max) {
      max = energized
    }
  }

  for (let y = 0; y < lines.length; y++) {
    const initialBeam = {
      start: new Point(lines[0].length - 1, y),
      end: searchLeft(new Point(lines[0].length - 1, y), tiles, false),
      direction: 'left'
    }

    const done = fillTilesWithBeams(tiles, initialBeam)
    const energized = countEnergized(tiles, done)
    if (energized > max) {
      max = energized
    }
  }

  for (let x = 0; x < lines[0].length; x++) {
    const initialBeam = {
      start: new Point(x, 0),
      end: searchDown(new Point(x, 0), tiles, false),
      direction: 'down'
    }

    const done = fillTilesWithBeams(tiles, initialBeam)
    const energized = countEnergized(tiles, done)
    if (energized > max) {
      max = energized
    }
  }

  for (let x = 0; x < lines[0].length; x++) {
    const initialBeam = {
      start: new Point(x, lines.length - 1),
      end: searchUp(new Point(x, lines.length - 1), tiles, false),
      direction: 'up'
    }

    const done = fillTilesWithBeams(tiles, initialBeam)
    const energized = countEnergized(tiles, done)
    if (energized > max) {
      max = energized
    }
  }

  return max
}

export function countEnergizedTiles (lines) {
  const tiles = lines.map(line => line.split(''))

  const initialBeam = {
    start: new Point(0, 0),
    end: searchRight(new Point(0, 0), tiles, false),
    direction: 'right'
  }

  const done = fillTilesWithBeams(tiles, initialBeam)
  return countEnergized(tiles, done)
}

function fillTilesWithBeams (tiles, initialBeam) {
  const done = new Set()
  const queue = []

  addIfNotLoop(queue, done, initialBeam)

  while (queue.length > 0) {
    const current = queue.shift()

    const mirror = getTile(current.end, tiles)
    if (mirror === '|') {
      addIfNotLoop(queue, done, {
        start: current.end,
        end: searchDown(current.end, tiles),
        direction: 'down'
      })
      addIfNotLoop(queue, done, {
        start: current.end,
        end: searchUp(current.end, tiles),
        direction: 'up'
      })
    } else if (mirror === '-') {
      addIfNotLoop(queue, done, {
        start: current.end,
        end: searchLeft(current.end, tiles),
        direction: 'left'
      })
      addIfNotLoop(queue, done, {
        start: current.end,
        end: searchRight(current.end, tiles),
        direction: 'right'
      })
    } else if (mirror === '/') {
      if (current.direction === 'right') {
        addIfNotLoop(queue, done, {
          start: current.end,
          end: searchUp(current.end, tiles),
          direction: 'up'
        })
      } else if (current.direction === 'down') {
        addIfNotLoop(queue, done, {
          start: current.end,
          end: searchLeft(current.end, tiles),
          direction: 'left'
        })
      } else if (current.direction === 'up') {
        addIfNotLoop(queue, done, {
          start: current.end,
          end: searchRight(current.end, tiles),
          direction: 'right'
        })
      } else if (current.direction === 'left') {
        addIfNotLoop(queue, done, {
          start: current.end,
          end: searchDown(current.end, tiles),
          direction: 'down'
        })
      }
    } else if (mirror === '\\') {
      if (current.direction === 'left') {
        addIfNotLoop(queue, done, {
          start: current.end,
          end: searchUp(current.end, tiles),
          direction: 'up'
        })
      } else if (current.direction === 'up') {
        addIfNotLoop(queue, done, {
          start: current.end,
          end: searchLeft(current.end, tiles),
          direction: 'left'
        })
      } else if (current.direction === 'down') {
        addIfNotLoop(queue, done, {
          start: current.end,
          end: searchRight(current.end, tiles),
          direction: 'right'
        })
      } else if (current.direction === 'right') {
        addIfNotLoop(queue, done, {
          start: current.end,
          end: searchDown(current.end, tiles),
          direction: 'down'
        })
      }
    }
  }

  return done
}

function searchLeft (from, tiles) {
  const next = new Point(from.x, from.y)
  let start = true

  while ((getTile(next, tiles) === '.' || getTile(next, tiles) === '-' || start) && next.x > 0) {
    next.x -= 1
    start = false
  }

  return next
}

function searchRight (from, tiles, ignoreFirst = true) {
  const next = new Point(from.x, from.y)
  let start = ignoreFirst

  while ((getTile(next, tiles) === '.' || getTile(next, tiles) === '-' || start) && next.x < tiles[next.y].length - 1) {
    next.x += 1
    start = false
  }

  return next
}

function searchDown (from, tiles) {
  const next = new Point(from.x, from.y)
  let start = true

  while ((getTile(next, tiles) === '.' || getTile(next, tiles) === '|' || start) && next.y < tiles.length - 1) {
    next.y += 1
    start = false
  }

  return next
}

function searchUp (from, tiles) {
  const next = new Point(from.x, from.y)
  let start = true

  while ((getTile(next, tiles) === '.' || getTile(next, tiles) === '|' || start) && next.y > 0) {
    next.y -= 1
    start = false
  }

  return next
}

const getTile = (point, tiles) => tiles[point.y][point.x]

function addIfNotLoop (queue, done, beam) {
  if (!done.has(JSON.stringify(beam))) {
    queue.push(beam)
    done.add(JSON.stringify(beam))
  }
}

function countEnergized (tiles, done) {
  const energized = new Set()

  for (const item of done) {
    const beam = JSON.parse(item)
    if (beam.direction === 'right') {
      for (let i = beam.start.x; i <= beam.end.x; i++) {
        energized.add(beam.start.y + ';' + i)
      }
    } else if (beam.direction === 'left') {
      for (let i = beam.start.x; i >= beam.end.x; i--) {
        energized.add(beam.start.y + ';' + i)
      }
    } else if (beam.direction === 'down') {
      for (let i = beam.start.y; i <= beam.end.y; i++) {
        energized.add(i + ';' + beam.start.x)
      }
    } else if (beam.direction === 'up') {
      for (let i = beam.start.y; i >= beam.end.y; i--) {
        energized.add(i + ';' + beam.start.x)
      }
    }
  }

  // const out = []
  // for (let y = 0; y < tiles.length; y++) {
  //   out[y] = ''
  //   for (let x = 0; x < tiles[y].length; x++) {
  //     if (energized.has(y + ';' + x)) {
  //       out[y] += '#'
  //     } else {
  //       out[y] += '.'
  //     }
  //   }
  // }

  // for (const line of out) {
  //   console.log(line)
  // }
  return energized.size
}
