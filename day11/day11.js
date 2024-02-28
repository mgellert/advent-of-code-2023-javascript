import { Point } from '../common/common'

export function sumGalaxyDistances (lines, multiplier) {
  const map = lines.map(line => line.split(''))

  const galaxies = getGalaxies(map)
  const emptyRows = getEmptyRows(map)
  const emptyCols = getEmptyCols(map)

  let distances = 0
  for (const galaxy of galaxies) {
    for (const other of galaxies) {
      let diff = 0
      diff += Math.abs(galaxy.x - other.x) + Math.abs(galaxy.y - other.y)
      diff += crossEmpties(emptyCols, galaxy.x, other.x, multiplier)
      diff += crossEmpties(emptyRows, galaxy.y, other.y, multiplier)

      distances += diff
    }
  }

  return distances / 2
}

function getGalaxies (map) {
  const galaxies = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        galaxies.push(new Point(x, y))
      }
    }
  }
  return galaxies
}

function getEmptyRows (map) {
  const emptyRows = new Set()
  for (let y = 0; y < map.length; y++) {
    if (map[y].every(x => x === '.')) {
      emptyRows.add(y)
    }
  }
  return emptyRows
}

function getEmptyCols (map) {
  const emptyCols = new Set()
  for (let x = 0; x < map[0].length; x++) {
    if (map.map(row => row[x]).every(y => y === '.')) {
      emptyCols.add(x)
    }
  }

  return emptyCols
}

function crossEmpties (empties, galaxyCoord, otherCoord, multiplier) {
  let count = 0
  if (otherCoord < galaxyCoord) {
    [otherCoord, galaxyCoord] = [galaxyCoord, otherCoord]
  }

  for (let i = galaxyCoord + 1; i < otherCoord; i++) {
    if (empties.has(i)) {
      count++
    }
  }

  return count * multiplier - count
}
