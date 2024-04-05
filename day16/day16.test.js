import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { countEnergizedTiles } from './day16'

describe('day 16', () => {
  const testInput = readLines('./day16/test_input.txt')
  const input = readLines('./day16/input.txt')

  test('test sumOfHashes', () => {
    expect(countEnergizedTiles(testInput)).toBe(46)
  })

  test('solve part 1', () => {
    expect(countEnergizedTiles(input)).toBe(6921)
  })
})
