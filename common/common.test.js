import { describe, expect, test } from 'vitest'
import { readLines } from './common'

describe('common functions', () => {
  test('should read lines of file', () => {
    expect(readLines('./common/test.txt')).toStrictEqual(['Lorem ipsum', 'dolor sit amet.'])
  })
})
