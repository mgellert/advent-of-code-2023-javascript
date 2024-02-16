import fs from 'node:fs'

export function readLines(path) {
    const data = fs.readFileSync(path, 'utf8');
    return data.split(/\n/)
}