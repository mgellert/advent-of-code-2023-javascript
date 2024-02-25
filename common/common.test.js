import { describe, expect, test } from 'vitest'
import { readLines, readAll, Point } from './common'

describe('common functions', () => {
  test('should read lines of file', () => {
    expect(readLines('./common/test.txt')).toStrictEqual(['Lorem ipsum', 'dolor sit amet.'])
  })

  test('should read whole file', () => {
    expect(readAll('./common/test.txt')).toStrictEqual('Lorem ipsum\ndolor sit amet.')
  })

  test('should represent a point', () => {
    const p1 = new Point(1, 2)
    expect(p1.x).toBe(1)
    expect(p1.y).toBe(2)
  })
})
