import { lcm } from 'mathjs'

export function countStepsToZZZ (lines) {
  const instructions = nextInstruction(lines[0])
  const nodes = {}

  lines.slice(2).forEach(line => {
    const [node, left, right] = /^([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)$/g.exec(line).slice(1)
    nodes[node] = [left, right]
  })

  return countSteps(instructions, nodes, 'AAA')
}

export function countStepsGhostSync (lines) {
  const instructions = nextInstruction(lines[0])
  const nodes = {}

  lines.slice(2).forEach(line => {
    const [node, left, right] = /^([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)$/g.exec(line).slice(1)
    nodes[node] = [left, right]
  })

  const steps = Object.keys(nodes).filter(key => {
    return key.endsWith('A')
  }).map(node => {
    return countSteps(instructions, nodes, node)
  })

  return lcm(...steps)
}

function countSteps (instructions, nodes, startNode) {
  let node = startNode
  let counter = 0

  while (!node.endsWith('Z')) {
    const instruction = instructions.next().value
    counter++
    if (instruction === 'L') {
      node = nodes[node][0]
    } else {
      node = nodes[node][1]
    }
  }

  return counter
}

function * nextInstruction (instructions) {
  let i = 0
  while (true) {
    if (i >= instructions.length) {
      i = 0
    }
    yield instructions.charAt(i)
    i++
  }
}
