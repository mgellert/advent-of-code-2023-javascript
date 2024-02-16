import { describe, expect, test } from 'vitest'
import { readLines } from '../common/common'
import { findCalibration, sumCalibration, correct } from './day01'

describe('day 1', () => {
  const input = readLines('./day01/input.txt')

  const part1TestInput = [
    ['1abc2', 12],
    ['pqr3stu8vwx', 38],
    ['a1b2c3d4e5f', 15],
    ['treb7uchet', 77]
  ]

  const part2TestInput = [
    ['two1nine', 29],
    ['eightwothree', 83],
    ['abcone2threexyz', 13],
    ['xtwone3four', 24],
    ['4nineeightseven2', 42],
    ['zoneight234', 14],
    ['7pqrstsixteen', 76],
    ['sevenine', 79]
  ]

  test.each(part1TestInput)("calibration for '%s' should be %i", (line, expected) => {
    expect(findCalibration(line)).toBe(expected)
  })

  test('sum of calibration should be 142', () => {
    expect(sumCalibration(part1TestInput.map(pair => pair[0]), false)).toBe(142)
  })

  test('solve part 1', () => {
    expect(sumCalibration(input, false)).toBe(54990)
  })

  test.each(part2TestInput)("corrected calibration for '%s' should be %i", (line, expected) => {
    expect(findCalibration(correct(line))).toBe(expected)
  })

  test('sum of corrected calibration should be 281', () => {
    expect(sumCalibration(part2TestInput.map(pair => pair[0]), true)).toBe(360)
  })

  test('solve part 2', () => {
    expect(sumCalibration(input, true)).toBe(54473)
  })
})
