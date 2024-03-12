import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { sumReflections } from './day13'

describe('day 13', () => {
  const testInput = readLines('./day13/test_input.txt')
  const input = readLines('./day13/input.txt')

  test('test sumReflections', () => {
    expect(sumReflections(testInput)).toBe(405)
  })

  test('solve part 1', () => {
    expect(sumReflections(input)).toBe(33728)
  })
})
