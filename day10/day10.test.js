import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { countStepsToFarthest } from './day10'

describe('day 10', () => {
  const testInput = readLines('./day10/test_input.txt')
  const input = readLines('./day10/input.txt')

  test('asdsadsda', () => {
    expect(countStepsToFarthest(testInput, 'F')).toBe(8)
  })

  test('asdsa2dsda', () => {
    expect(countStepsToFarthest(input, '7')).toBe(6815)
  })
})
