import { describe, expect, test } from 'vitest'
import { numberOfWaysToBeat, numberOfWaysToBeatAllRaces } from './day06'

describe('day 6', () => {
  const testInput = [
    [7, 9], [15, 40], [30, 200]
  ]
  const input = [
    [51, 222], [92, 2031], [68, 1126], [90, 1225]
  ]

  test('number of ways to beat 7-9', () => {
    expect(numberOfWaysToBeat(7, 9)).toBe(4)
  })

  test('calculate number of ways to beat all races', () => {
    expect(numberOfWaysToBeatAllRaces(testInput)).toBe(288)
  })

  test('solve part 1', () => {
    expect(numberOfWaysToBeatAllRaces(input)).toBe(500346)
  })

  test('solve part 1', () => {
    expect(numberOfWaysToBeat(51926890, 222203111261225)).toBe(42515755)
  })
})
