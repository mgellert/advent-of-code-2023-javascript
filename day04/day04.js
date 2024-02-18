export function parseLine (line) {
  const [head, tail] = line.split(':')
  const id = head.match(/\d+/)[0]
  const [have, winning] = parseTicketNumbers(tail)
  const wins = countWins(have, winning)

  return { id, have, winning, wins }
}

function parseTicketNumbers (raw) {
  const [first, second] = raw.split('|')
  const have = first.split(' ').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n))
  const winning = new Set(second.split(' ').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n)))

  return [have, winning]
}

function countWins (have, winning) {
  return have.filter(n => winning.has(n)).length
}

export function score (ticket) {
  if (ticket.wins === 0) {
    return 0
  } else {
    return 2 ** (ticket.wins - 1)
  }
}

export function sumScores (lines) {
  return lines
    .map(line => parseLine(line))
    .map(ticket => score(ticket))
    .reduce((acc, s) => acc + s, 0)
}

export function countTickets (lines) {
  const tickets = lines.map(line => parseLine(line))
  const ticketCounter = tickets.reduce((acc, ticket) => {
    acc[ticket.id] = 1
    return acc
  }, {})
  const ticketById = tickets.reduce((acc, ticket) => {
    acc[ticket.id] = ticket
    return acc
  }, {})

  let total = Object.keys(ticketCounter).length

  while (hasUncountedTickets(ticketCounter)) {
    const [id, count] = getFirstUncountedTicket(ticketCounter)
    const ticket = ticketById[id]

    ticketCounter[id] = 0

    for (let i = id + 1; i <= id + ticket.wins; i++) {
      ticketCounter[i] += count
      total += count
    }
  }

  return total
}

function hasUncountedTickets (ticketCounter) {
  return Object.values(ticketCounter).some(n => n > 0)
}

function getFirstUncountedTicket (ticketCounter) {
  return Object.entries(ticketCounter)
    .find(([_, value]) => value > 0)
    .map(n => parseInt(n, 10))
}
