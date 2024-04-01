import { Point, hashcode } from '../common/common'

Point.prototype.shiftUp = function () {
  return new Point(this.x, Math.max(this.y - 1, 0))
}

Point.prototype.shiftRight = function (size) {
  return new Point(Math.min(this.x + 1, size - 1), this.y)
}

Point.prototype.shiftDown = function (size) {
  return new Point(this.x, Math.min(this.y + 1, size - 1))
}

Point.prototype.shiftLeft = function () {
  return new Point(Math.max(this.x - 1, 0), this.y)
}

export function spinLoad (lines) {
  let [roundedRocks, fixedRocks] = parse(lines)

  let direction = 0
  const repetitions = new Map()

  for (let i = 0; i < 4000000000; i++) {
    let moves = 0
    do {
      moves = 0
      const movedRoundedRocks = new Map()

      for (const rock of roundedRocks.values()) {
        let shifted
        if (direction > 3) {
          direction = 0
        }

        if (direction === 0) {
          shifted = rock.shiftUp()
        } else if (direction === 1) {
          shifted = rock.shiftLeft()
        } else if (direction === 2) {
          shifted = rock.shiftDown(lines.length)
        } else if (direction === 3) {
          shifted = rock.shiftRight(lines.length)
        }

        if (!roundedRocks.has(shifted.toString()) && !fixedRocks.has(shifted.toString())) {
          movedRoundedRocks.set(shifted.toString(), shifted)
          moves++
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

    const p = print(roundedRocks, fixedRocks, lines.length)
    const hash = hashcode(p)

    // console.log('itr = ' + i, direction, hash)
    // console.log(p)
    if (repetitions.has(hash)) {
      const pattern = i - repetitions.get(hash)

      while (i + pattern < 4000000000) {
        i += pattern
      }
    } else {
      repetitions.set(hash, i)
    }

    direction++
  }

  let load = 0
  for (const rock of roundedRocks.values()) {
    load += lines.length - rock.y
  }

  console.log(load)
  return load
}

export function totalLoad (lines) {
  let [roundedRocks, fixedRocks] = parse(lines)

  let moves = 0
  do {
    moves = 0
    const movedRoundedRocks = new Map()

    for (const rock of roundedRocks.values()) {
      const shifted = rock.shiftUp()
      if (!roundedRocks.has(shifted.toString()) && !fixedRocks.has(shifted.toString())) {
        movedRoundedRocks.set(shifted.toString(), shifted)
        moves++
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
  for (const rock of roundedRocks.values()) {
    load += lines.length - rock.y
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
  let str = ''
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const p = new Point(x, y)
      if (roundedRocks.has(p.toString())) {
        str += 'O'
      } else if (fixedRocks.has(p.toString())) {
        str += '#'
      } else {
        str += '.'
      }
    }
    str += '\n'
  }
  return str
}
