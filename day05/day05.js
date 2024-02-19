export function parseMap (raw) {
  const name = raw.match(/^[a-z-]+ map:/)[0].slice(0, -5)
  const items = raw.split('\n').slice(1).map(line => {
    const [dest, source, range] = line.split(' ').map(n => parseInt(n, 10))
    return { dest, source, range }
  })

  return {
    name,
    items
  }
}

export function lookup (map, value) {
  for (const item of map.items) {
    const lower = item.source
    const upper = item.source + item.range

    if (value >= lower && value < upper) {
      return value - lower + item.dest
    }
  }

  return value
}

export function lowestLocationNumber (raw) {
  const [head, ...tail] = raw.split('\n\n')

  const seeds = head.slice(7).split(' ').map(n => parseInt(n, 10))
  const maps = tail.map(i => parseMap(i))

  return Math.min(...seeds.map(seed => lookupSeed(maps, seed)))
}

function lookupSeed (maps, seed) {
  let number = seed

  for (const map of maps) {
    number = lookup(map, number)
  }

  return number
}

export function lowestLocationNumberSeedRanges (raw) {
  const [head, ...tail] = raw.split('\n\n')

  const rawSeeds = head.slice(7).split(' ').map(n => parseInt(n, 10))
  const seedRanges = []
  for (let i = 0; i < rawSeeds.length; i += 2) {
    seedRanges.push([rawSeeds[i], rawSeeds[i + 1]])
  }

  const maps = tail.map(i => parseMap(i))

  let min = Infinity
  for (const [seed, range] of seedRanges) {
    for (let i = seed; i < seed + range; i++) {
      const loc = lookupSeed(maps, i)
      if (loc < min) {
        min = loc
      }
    }
  }

  return min
}
