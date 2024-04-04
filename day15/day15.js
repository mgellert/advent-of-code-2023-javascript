export function sumOfHashes (input) {
  const steps = input.split(',')
  return steps.map(step => hash(step)).reduce((acc, n) => acc + n, 0)
}

function hash (str) {
  let cv = 0

  for (const char of str) {
    cv += char.charCodeAt(0)
    cv *= 17
    cv %= 256
  }

  return cv
}

export function focusingPower (input) {
  const steps = input.split(',')

  const boxes = []

  for (const step of steps) {
    const [label, focalLength] = parseStep(step)

    const boxNum = hash(label)

    if (boxes[boxNum] === undefined) {
      boxes[boxNum] = new Map()
    }

    const box = boxes[boxNum]

    if (focalLength !== undefined) {
      box.set(label, focalLength)
    } else {
      box.delete(label)
    }
    boxes[boxNum] = box
  }

  let sum = 0
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i] === undefined) {
      continue
    }

    const focalLengths = Array.from(boxes[i].values())
    for (let j = 0; j < focalLengths.length; j++) {
      const focalLength = focalLengths[j]
      sum += (i + 1) * (j + 1) * focalLength
    }
  }

  return sum
}

function parseStep (step) {
  if (step.includes('=')) {
    let [label, focalLength] = step.split('=')
    focalLength = parseInt(focalLength, 10)
    return [label, focalLength]
  } else {
    return [step.split('-')[0], undefined]
  }
}
