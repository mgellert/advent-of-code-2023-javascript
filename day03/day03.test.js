import { describe, expect, test } from 'vitest'
import { parseLine, sumPartNumbers, sumAllGearRatios } from './day03'
import { readLines } from '../common/common'

describe('day 3', () => {
  const input = readLines('./day03/input.txt')
  const testInput = readLines('./day03/test_input.txt')

  test('parse example line 1', () => {
    const numbers = {}
    const symbols = {}
    parseLine('467..114..', 0, numbers, symbols)

    expect(numbers).toStrictEqual({
      '0,0': 467,
      '0,1': 467,
      '0,2': 467,
      '0,5': 114,
      '0,6': 114,
      '0,7': 114
    })
    expect(symbols).toStrictEqual({})
  })

  test('parse example line 5', () => {
    const numbers = {}
    const symbols = {}
    parseLine('617*......', 1, numbers, symbols)

    expect(numbers).toStrictEqual({
      '1,0': 617,
      '1,1': 617,
      '1,2': 617
    })
    expect(symbols).toStrictEqual({
      '1,3': '*'
    })
  })

  test('parse custom line 1', () => {
    const numbers = {}
    const symbols = {}
    parseLine('12', 1, numbers, symbols)

    expect(numbers).toStrictEqual({
      '1,0': 12,
      '1,1': 12
    })
    expect(symbols).toStrictEqual({})
  })

  test('sum part numbers', () => {
    expect(sumPartNumbers(testInput)).toBe(4361)
  })

  test('solve part 1', () => {
    expect(sumPartNumbers(input)).toBe(527364)
  })

  test('sum part numbers', () => {
    expect(sumAllGearRatios(testInput)).toBe(467835)
  })

  test('solve part 2', () => {
    expect(sumAllGearRatios(input)).toBe(79026871)
  })
})
