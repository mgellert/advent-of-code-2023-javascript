export function numberOfWaysToBeat (time, best) {
  let beat = 0
  for (let speed = 0; speed <= time; speed++) {
    const timeLeft = time - speed
    const distance = timeLeft * speed
    if (distance > best) {
      beat++
    }
  }
  return beat
}

export function numberOfWaysToBeatAllRaces (races) {
  return races.map(race => numberOfWaysToBeat(race[0], race[1])).reduce((acc, n) => acc * n, 1)
}
