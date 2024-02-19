import { describe, expect, test } from 'vitest'
import { lookup, parseMap, lowestLocationNumber, lowestLocationNumberSeedRanges } from './day05'
import { readAll } from '../common/common'

describe('day 5', () => {
  const testInput = readAll('./day05/test_input.txt')
  const input = readAll('./day05/input.txt')

  test('parse one map', () => {
    const input = 'seed-to-soil map:\n50 98 2\n52 50 48'

    expect(parseMap(input)).toStrictEqual({
      name: 'seed-to-soil',
      items: [{
        source: 98,
        dest: 50,
        range: 2
      }, {
        source: 50,
        dest: 52,
        range: 48
      }]
    })
  })

  test.each([
    [79, 81],
    [14, 14],
    [55, 57],
    [13, 13]
  ])('lookup value %d in map', (value, expected) => {
    const map = {
      name: 'seed-to-soil',
      items: [{
        source: 98,
        dest: 50,
        range: 2
      }, {
        source: 50,
        dest: 52,
        range: 48
      }]
    }

    expect(lookup(map, value)).toBe(expected)
  })

  test('calculate lowest location number', () => {
    expect(lowestLocationNumber(testInput)).toBe(35)
  })

  test('solve part 1', () => {
    expect(lowestLocationNumber(input)).toBe(107430936)
  })

  test('lowestLocationNumberSeedRanges', () => {
    expect(lowestLocationNumberSeedRanges(testInput)).toBe(46)
  })

  // takes 6 minutes to run
  test.skip('solve part 2', () => {
    expect(lowestLocationNumberSeedRanges(input)).toBe(23738616)
  })
})
