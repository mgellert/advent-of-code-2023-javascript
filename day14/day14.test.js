import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { totalLoad, spinLoad } from './day14'

describe('day 14', () => {
  const testInput = readLines('./day14/test_input.txt')
  const input = readLines('./day14/input.txt')

  test('test totalLoad', () => {
    expect(totalLoad(testInput)).toBe(136)
  })

  test('solve part 1', () => {
    expect(totalLoad(input)).toBe(108759)
  })

  test('test spinLoad', () => {
    expect(spinLoad(testInput)).toBe(64)
  })

  test.skip('solve part 2', () => {
    expect(spinLoad(input)).toBe(89089)
  })
})
