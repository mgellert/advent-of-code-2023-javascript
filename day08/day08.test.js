import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { countStepsToZZZ, countStepsGhostSync } from './day08'

describe('day 8', () => {
  const testInput1 = readLines('./day08/test_input.txt')
  const testInput2 = readLines('./day08/test_input_2.txt')
  const input = readLines('./day08/input.txt')

  test('count steps to reach ZZZ', () => {
    expect(countStepsToZZZ(testInput1)).toBe(2)
  })

  test('solve part 1', () => {
    expect(countStepsToZZZ(input)).toBe(20777)
  })

  test('count steps until ghosts sync', () => {
    expect(countStepsGhostSync(testInput2)).toBe(6)
  })

  test('solve part 2', () => {
    expect(countStepsGhostSync(input)).toBe(13289612809129)
  })
})
