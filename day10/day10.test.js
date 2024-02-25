import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { countStepsToFarthest } from './day10'

describe('day 10', () => {
  const testInput = readLines('./day10/test_input.txt')
  const input = readLines('./day10/input.txt')

  test('test farthest point in loop', () => {
    expect(countStepsToFarthest(testInput, 'F')).toBe(8)
  })

  test('solve part 1', () => {
    expect(countStepsToFarthest(input, '7')).toBe(6815)
  })
})
