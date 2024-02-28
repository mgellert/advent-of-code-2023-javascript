import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { sumGalaxyDistances } from './day11'

describe('day 11', () => {
  const testInput = readLines('./day11/test_input.txt')
  const input = readLines('./day11/input.txt')

  test('test sum galaxy distances with expansion of 2', () => {
    expect(sumGalaxyDistances(testInput, 2)).toBe(374)
  })

  test('solve part 1', () => {
    expect(sumGalaxyDistances(input, 2)).toBe(9545480)
  })

  test('test sum galaxy distances with expansion of 10', () => {
    expect(sumGalaxyDistances(testInput, 10)).toBe(1030)
  })

  test('test sum galaxy distances with expansion of 100', () => {
    expect(sumGalaxyDistances(testInput, 100)).toBe(8410)
  })

  test('solve part 2', () => {
    expect(sumGalaxyDistances(input, 1000000)).toBe(406725732046)
  })
})
