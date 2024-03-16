import { Point } from '../common/common'

Point.prototype.shift = function () {
  return new Point(this.x, this.y - 1)
}

export function totalLoad (lines) {
  let [roundedRocks, fixedRocks] = parse(lines)

  let moves = 0
  do {
    moves = 0
    const movedRoundedRocks = new Map()

    for (const rock of roundedRocks.values()) {
      if (rock.y > 0) {
        const shifted = rock.shift()
        if (!roundedRocks.has(shifted.toString()) && !fixedRocks.has(shifted.toString())) {
          movedRoundedRocks.set(shifted.toString(), shifted)
          moves++
        } else {
          movedRoundedRocks.set(rock.toString(), rock)
        }
      } else {
        movedRoundedRocks.set(rock.toString(), rock)
      }
    }

    roundedRocks = new Map([...movedRoundedRocks].sort((a, b) => {
      if (a.y !== b.y) {
        return a.y - b.y
      } else {
        return a.x - b.x
      }
    }))
  } while (moves > 0)

  // print(roundedRocks, fixedRocks, lines.length)

  let load = 0
  for (let y = 0; y < lines.length; y++) {
    let count = 0
    for (let x = 0; x < lines[y].length; x++) {
      const p = new Point(x, y)
      if (roundedRocks.has(p.toString())) {
        count++
      }
    }
    load += count * (lines.length - y)
  }
  return load
}

function parse (lines) {
  const roundedRocks = new Map()
  const fixedRocks = new Map()

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const c = lines[y].charAt(x)
      if (c === '#') {
        const p = new Point(x, y)
        fixedRocks.set(p.toString(), p)
      } else if (c === 'O') {
        const p = new Point(x, y)
        roundedRocks.set(p.toString(), p)
      }
    }
  }

  return [roundedRocks, fixedRocks]
}

function print (roundedRocks, fixedRocks, size) {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const p = new Point(x, y)
      if (roundedRocks.has(p.toString())) {
        process.stdout.write('O')
      } else if (fixedRocks.has(p.toString())) {
        process.stdout.write('#')
      } else {
        process.stdout.write('.')
      }
    }
    process.stdout.write('\n')
  }
  process.stdout.write('\n')
}
