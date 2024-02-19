import { describe, expect, test } from 'vitest'
import { readLines, readAll } from './common'

describe('common functions', () => {
  test('should read lines of file', () => {
    expect(readLines('./common/test.txt')).toStrictEqual(['Lorem ipsum', 'dolor sit amet.'])
  })

  test('should read whole file', () => {
    expect(readAll('./common/test.txt')).toStrictEqual('Lorem ipsum\ndolor sit amet.')
  })
})
