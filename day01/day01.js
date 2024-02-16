export function findCalibration (line) {
  const digits = line.replaceAll(/\D/gi, '')
  const first = digits.slice(0, 1)
  const last = digits.slice(-1)
  return parseInt(first + last, 10)
}

export function sumCalibration (lines, withCorrection) {
  return lines.map(line => {
    if (withCorrection) {
      return findCalibration(correct(line))
    } else {
      return findCalibration(line)
    }
  })
    .reduce((acc, i) => acc + i, 0)
}

export function correct (line) {
  // need to preserve the first and last characters, because there are overlaps in the input
  // i.e. sevenine which should be 79
  return line
    .replaceAll('one', 'o1e')
    .replaceAll('two', 't2o')
    .replaceAll('three', 't3e')
    .replaceAll('four', 'f4r')
    .replaceAll('five', 'f5e')
    .replaceAll('six', 's6x')
    .replaceAll('seven', 's7n')
    .replaceAll('eight', 'e8t')
    .replaceAll('nine', 'n9e')
}
