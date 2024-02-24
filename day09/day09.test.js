import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { nextValue, sumOfExtrapolatedValues, prevValue, sumOfBackwardsExtrapolatedValues } from './day09'

describe('day 9', () => {
  const testInput = readLines('./day09/test_input.txt')
  const input = readLines('./day09/input.txt')

  test('calculate next value for one line', () => {
    expect(nextValue('10  13  16  21  30  45')).toBe(68)
  })

  test('sum of extrapolated values', () => {
    expect(sumOfExtrapolatedValues(testInput)).toBe(114)
  })

  test('solve part 1', () => {
    expect(sumOfExtrapolatedValues(input)).toBe(1798691765)
  })

  test('calculate backwards value for one line', () => {
    expect(prevValue('10  13  16  21  30  45')).toBe(5)
  })

  test('sum of backwards extrapolated values', () => {
    expect(sumOfBackwardsExtrapolatedValues(testInput)).toBe(2)
  })

  test('solve part 2', () => {
    expect(sumOfBackwardsExtrapolatedValues(input)).toBe(1104)
  })
})
