import fs from 'node:fs'

export function readLines (path) {
  const data = fs.readFileSync(path, 'utf8')
  return data.split(/\n/)
}

export function readAll (path) {
  return fs.readFileSync(path, 'utf8')
}

export class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  add (other) {
    return new Point(this.x + other.x, this.y + other.y)
  }

  subtract (other) {
    return new Point(other.x - this.x, other.y - this.y)
  }

  equals (other) {
    return this.x === other.x && this.y === other.y
  }

  toString () {
    return `Point(x = ${this.x},y = ${this.y})`
  }
}
