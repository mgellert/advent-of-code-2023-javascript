export function sumReflections (lines) {
  const maps = parseMaps(lines)
  let sum = 0
  for (const map of maps) {
    sum += findHorizontal(map, isValid) * 100
    sum += findHorizontal(transpose(map), isValid)
  }

  return sum
}

export function correctAndSumReflections (lines) {
  const maps = parseMaps(lines)
  let sum = 0
  for (const map of maps) {
    sum += findHorizontal(map, correctAndValidate) * 100
    sum += findHorizontal(transpose(map), correctAndValidate)
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

function findHorizontal (map, fn) {
  for (let i = 0; i < map.length - 1; i++) {
    if (fn(map, i + 1)) {
      return i + 1
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

function correctAndValidate (map, idx) {
  const a = map.slice(0, idx).reverse()
  const b = map.slice(idx)

  const minEqual = Math.min(a.length, b.length)
  let diffs = 0

  for (let i = 0; i < minEqual; i++) {
    diffs += diff(a[i], b[i])
  }
  return diffs === 1
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

function diff (a, b) {
  let diffs = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diffs++
    }
  }
  return diffs
}
