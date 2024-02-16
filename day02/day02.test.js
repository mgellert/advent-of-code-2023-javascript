import { describe, expect, test } from 'vitest'
import { parseLine, sumOfPossibleGames, sumOfPowerOfGames } from './day02'
import { readLines } from '../common/common'

describe('day 2', () => {
  const input = readLines('./day02/input.txt')

  const testInput = [
    'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
  ]

  test('parse line', () => {
    expect(parseLine('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toStrictEqual({
      id: 1,
      reveals: [
        { red: 4, green: 0, blue: 3 },
        { red: 1, green: 2, blue: 6 },
        { red: 0, green: 2, blue: 0 }
      ]
    })
  })

  test('sum of possible games', () => {
    expect(sumOfPossibleGames(testInput)).toBe(8)
  })

  test('solve part 1', () => {
    expect(sumOfPossibleGames(input)).toBe(2545)
  })

  test('sum of power of games', () => {
    expect(sumOfPowerOfGames(testInput)).toBe(2286)
  })

  test('solve part 2', () => {
    expect(sumOfPowerOfGames(input)).toBe(78111)
  })
})
