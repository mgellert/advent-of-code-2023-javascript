export function sumPossibleArrangements (lines) {
  const cache = {}
  return lines.map(line => countArrangements(line, cache))
    .reduce((sum, n) => sum + n, 0)
}

export function countArrangements (line, cache) {
  const [springs, damagedGroups] = line.split(' ')
  return process(springs.split(''), damagedGroups.split(',').map(n => parseInt(n, 10)), '', cache)
}

export function sumExpandedArrangements (lines) {
  return lines.map((line) => countExpandedArrangements(line, {}))
    .reduce((sum, n) => sum + n, 0)
}

export function countExpandedArrangements (line, cache) {
  let [springs, damagedGroups] = line.split(' ')
  springs = new Array(5).fill(springs).join('?')
  damagedGroups = new Array(5).fill(damagedGroups).join(',')
  const result = process(springs.split(''), damagedGroups.split(',').map(n => parseInt(n, 10)), '', cache)
  return result
}

function process (springs, damagedGroups, assembled, cache) {
  const springsStr = springs.join('') + ';' + damagedGroups.join(',')
  if (cache[springsStr]) {
    return cache[springsStr]
  }
  if (springs.length === 0 && damagedGroups.length === 0) {
    // console.log(assembled, 'possible')
    return 1
  } else if (springs[0] === '?') {
    const result = process(['#', ...springs.slice(1)], damagedGroups, assembled, cache) +
    process(['.', ...springs.slice(1)], damagedGroups, assembled, cache)
    cache[springsStr] = result
    return result
  } else if (springs[0] === '.') {
    const result = process([...springs.slice(1)], damagedGroups, assembled + '.', cache)
    cache[springsStr] = result
    return result
  } else if (springs[0] === '#') {
    const brokenCount = countBrokenSprings(springs, damagedGroups[0])
    if (brokenCount === damagedGroups[0] && springs[brokenCount] !== '#') {
      if (springs.length === brokenCount) {
        return process([], damagedGroups.slice(1), assembled + springs.join('').replaceAll('?', '#'), cache)
      } else {
        assembled += '#'.repeat(brokenCount) + '.'
        const result = process([...springs.slice(brokenCount + 1)], damagedGroups.slice(1), assembled, cache)
        cache[springsStr] = result
        return result
      }
    } else {
      // console.log(assembled + springs.join(''))
      return 0
    }
  }
  // console.log(assembled)
  return 0
}

function countBrokenSprings (springs, max) {
  let count = 0
  for (const s of springs) {
    if (s === '#' || s === '?') {
      count++
    } else {
      break
    }
  }

  return Math.min(count, max)
}
