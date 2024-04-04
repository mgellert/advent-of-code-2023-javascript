import { describe, expect, test } from 'vitest'
import { readAll } from '../common/common'
import { sumOfHashes, focusingPower } from './day15'

describe('day 15', () => {
  const testInput = readAll('./day15/test_input.txt')
  const input = readAll('./day15/input.txt')

  test('test sumOfHashes', () => {
    expect(sumOfHashes(testInput)).toBe(1320)
  })

  test('solve part 1', () => {
    expect(sumOfHashes(input)).toBe(511498)
  })

  test('test focusingPower', () => {
    expect(focusingPower(testInput)).toBe(145)
  })

  test('solve part 2', () => {
    expect(focusingPower(input)).toBe(284674)
  })
})
