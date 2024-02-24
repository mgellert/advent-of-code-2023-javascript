export function sumOfExtrapolatedValues (lines) {
  return lines.map(line => nextValue(line)).reduce((acc, n) => acc + n, 0)
}

export function sumOfBackwardsExtrapolatedValues (lines) {
  return lines.map(line => prevValue(line)).reduce((acc, n) => acc + n, 0)
}

export function prevValue (line) {
  const nums = line.split(' ').map(n => parseInt(n, 10)).filter(n => !Number.isNaN(n))
  const histories = [nums]
  let sum = 1
  let diffs

  while (sum !== 0) {
    [diffs, sum] = calculateDiffs(lastItem(histories))
    histories.push(diffs)
  }

  lastItem(histories).push(0)

  for (let i = histories.length - 2; i >= 0; i--) {
    const firstNum = histories[i + 1][0]
    histories[i].unshift(histories[i][0] - firstNum)
  }

  return histories[0][0]
}

export function nextValue (line) {
  const nums = line.split(' ').map(n => parseInt(n, 10)).filter(n => !Number.isNaN(n))
  const histories = [nums]
  let sum = 1
  let diffs

  while (sum !== 0) {
    [diffs, sum] = calculateDiffs(lastItem(histories))
    histories.push(diffs)
  }

  lastItem(histories).push(0)

  for (let i = histories.length - 2; i >= 0; i--) {
    const lastNum = lastItem(histories[i + 1])
    histories[i].push(lastItem(histories[i]) + lastNum)
  }

  return lastItem(histories[0])
}

function calculateDiffs (nums) {
  const diffs = []
  let sum = 0
  for (let i = 0; i < nums.length - 1; i++) {
    const diff = nums[i + 1] - nums[i]
    diffs.push(diff)
    sum += diff
  }
  return [diffs, sum]
}

function lastItem (arr) {
  return arr[arr.length - 1]
}
