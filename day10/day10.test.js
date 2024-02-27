import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { countStepsToFarthest, countEnclosedTiles } from './day10'

describe('day 10', () => {
  const testInput1 = readLines('./day10/test_input_1.txt')
  const testInput2 = readLines('./day10/test_input_2.txt')
  const testInput3 = readLines('./day10/test_input_3.txt')
  const testInput4 = readLines('./day10/test_input_4.txt')
  const input = readLines('./day10/input.txt')

  test('test farthest point in loop', () => {
    expect(countStepsToFarthest(testInput1, 'F')).toBe(8)
  })

  test('solve part 1', () => {
    expect(countStepsToFarthest(input, '7')).toBe(6815)
  })

  test('test count enclosed tiles 1', () => {
    expect(countEnclosedTiles(testInput2, 'F')).toBe(4)
  })

  test('test count enclosed tiles 2', () => {
    expect(countEnclosedTiles(testInput3, 'F')).toBe(8)
  })

  test('test count enclosed tiles 3', () => {
    expect(countEnclosedTiles(testInput4, '7')).toBe(10)
  })

  test('solve part 2', () => {
    expect(countEnclosedTiles(input, '7')).toBe(269)
  })
})
