import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { countEnergizedTiles, maxEnergizedTiles } from './day16'

describe('day 16', () => {
  const testInput = readLines('./day16/test_input.txt')
  const input = readLines('./day16/input.txt')

  test('test countEnergizedTiles', () => {
    expect(countEnergizedTiles(testInput)).toBe(46)
  })

  test('solve part 1', () => {
    expect(countEnergizedTiles(input)).toBe(6921)
  })

  test('test maxEnergizedTiles', () => {
    expect(maxEnergizedTiles(testInput)).toBe(51)
  })

  test('solve part 2', () => {
    expect(maxEnergizedTiles(input)).toBe(0)
  })
})
