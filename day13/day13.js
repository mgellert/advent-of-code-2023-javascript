export function sumReflections (lines) {
  const maps = parseMaps(lines)
  let sum = 0
  for (const map of maps) {
    sum += findHorizontal(map) * 100
    sum += findHorizontal(transpose(map))
  }

  return sum
}

function parseMaps (lines) {
  const maps = []
  let map = []

  for (const line of lines) {
    if (line.length > 0) {
      map.push(line)
    } else {
      maps.push(map)
      map = []
    }
  }
  maps.push(map)

  return maps
}

function findHorizontal (map) {
  for (let i = 0; i < map.length - 1; i++) {
    if (map[i] === map[i + 1]) {
      if (isValid(map, i + 1)) {
        return i + 1
      }
    }
  }
  return 0
}

function isValid (map, idx) {
  const a = map.slice(0, idx).reverse()
  const b = map.slice(idx)

  const minEqual = Math.min(a.length, b.length)

  for (let i = 0; i < minEqual; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

function transpose (map) {
  const transposed = Array(map[0].length).fill('')
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      transposed[j] += map[i][j]
    }
  }
  return transposed
}
