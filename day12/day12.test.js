import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { countArrangements, sumPossibleArrangements, sumExpandedArrangements } from './day12'

describe('day 12', () => {
  const testInput = readLines('./day12/test_input.txt')
  const input = readLines('./day12/input.txt')

  test.each([
    ['???.### 1,1,3', 1],
    ['.??..??...?##. 1,1,3', 4],
    ['?#?#?#?#?#?#?#? 1,3,1,6', 1],
    ['????.#...#... 4,1,1', 1],
    ['????.######..#####. 1,6,5', 4],
    ['?###???????? 3,2,1', 10]
  ])('test counting possible arrangements %s', (line, expected) => {
    expect(countArrangements(line, {})).toBe(expected)
  })

  test('test sum possible arrangements', () => {
    expect(sumPossibleArrangements(testInput)).toBe(21)
  })

  test('solve part 1', () => {
    expect(sumPossibleArrangements(input)).toBe(7236)
  })

  test('test sum expanded arrangements', () => {
    expect(sumExpandedArrangements(testInput)).toBe(525152)
  })

  // test('solve part 2', () => {
  //   expect(sumExpandedArrangements(input)).toBe(22)
  // })
})
