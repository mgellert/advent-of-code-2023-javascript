export function parseLine (line) {
  const [head, tail] = line.split(':')
  const id = parseInt(head.match(/\d+/)[0], 10)
  const [have, winning] = parseTicketNumbers(tail)

  return { id, have, winning }
}

function parseTicketNumbers (raw) {
  const [first, second] = raw.split('|')
  const have = first.split(' ').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n))
  const winning = new Set(second.split(' ').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n)))

  return [have, winning]
}

export function score (ticket) {
  let winningNumbers = 0

  for (const n of ticket.have) {
    if (ticket.winning.has(n)) {
      if (winningNumbers === 0) {
        winningNumbers = 1
      } else {
        winningNumbers *= 2
      }
    }
  }

  return winningNumbers
}

export function sumPoints (lines) {
  const tickets = lines.map(line => parseLine(line))

  let points = 0

  for (const ticket of tickets) {
    points += score(ticket)
  }

  return points
}

export function countTickets (lines) {
  const tickets = lines.map(line => parseLine(line))
  const ticketCount = tickets.reduce((acc, ticket) => {
    acc[ticket.id] = 1
    return acc
  }, {})
  const ticketsMap = tickets.reduce((acc, ticket) => {
    acc[ticket.id] = ticket
    return acc
  }, {})

  console.log(typeof ticketCount)
  let total = Object.keys(ticketCount).length

  while (Object.values(ticketCount).reduce((acc, n) => acc + n, 0) > 0) {
    const aaa = Object.entries(ticketCount).filter(([key, value]) => value > 0)
    const [id, count] = aaa[0].map(n => parseInt(n, 10))
    const ticket = ticketsMap[id]
    const points = countWins(ticket)

    ticketCount[id] = 0

    for (let i = id + 1; i <= id + points; i++) {
      ticketCount[i] += count
      total += count
    }
  }

  return total
}

function countWins (ticket) {
  let wins = 0

  for (const n of ticket.have) {
    if (ticket.winning.has(n)) {
      wins++
    }
  }

  return wins
}
