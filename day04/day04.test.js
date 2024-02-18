import { describe, expect, test } from 'vitest'
import { parseLine, score, sumPoints, countTickets } from './day04'
import { readLines } from '../common/common'

describe('day 1', () => {
  const input = readLines('./day04/input.txt')
  const testInput = readLines('./day04/test_input.txt')

  test('parsing ticket', () => {
    expect(parseLine('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')).toStrictEqual({
      id: 1,
      have: [41, 48, 83, 86, 17],
      winning: new Set([83, 86, 6, 31, 17, 9, 48, 53])
    })
  })

  test('test scoring', () => {
    const ticket = {
      id: 1,
      have: [41, 48, 83, 86, 17],
      winning: new Set([83, 86, 6, 31, 17, 9, 48, 53])
    }

    expect(score(ticket)).toBe(8)
  })

  test('sum points', () => {
    expect(sumPoints(testInput)).toBe(13)
  })

  test('solve part 1', () => {
    expect(sumPoints(input)).toBe(25010)
  })

  test('count tickets', () => {
    expect(countTickets(testInput)).toBe(30)
  })

  test('solve part 2', () => {
    expect(countTickets(input)).toBe(9924412)
  })
})
