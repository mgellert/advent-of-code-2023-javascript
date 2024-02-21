import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { calculateTotalWinnings, calculateTotalWinningsJoker } from './day07'

describe('day 7', () => {
  const testInput = readLines('./day07/test_input.txt')
  const input = readLines('./day07/input.txt')

  test('test calculate total winnings', () => {
    expect(calculateTotalWinnings(testInput)).toBe(6440)
  })

  test('solve part 1', () => {
    expect(calculateTotalWinnings(input)).toBe(245794640)
  })

  test('test calculate total winnings with jokers', () => {
    expect(calculateTotalWinningsJoker(testInput)).toBe(5905)
  })

  test('solve part 2', () => {
    expect(calculateTotalWinningsJoker(input)).toBe(247899149)
  })
})
