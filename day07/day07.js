export function calculateTotalWinnings (lines) {
  const hands = lines.map(line => {
    const [hand, bid] = line.split(' ')
    return { hand, bid: parseInt(bid, 10) }
  }).sort(simpleRules)

  return hands.map((hand, idx) => hand.bid * (idx + 1)).reduce((acc, n) => acc + n, 0)
}

function simpleRules (a, b) {
  const [countA] = countChars(a.hand)
  const [countB] = countChars(b.hand)

  const scoreA = scoreHand(countA)
  const scoreB = scoreHand(countB)

  const diff = scoreA - scoreB
  if (diff !== 0) {
    return diff
  } else {
    for (let i = 0; i < 5; i++) {
      const charA = scoreChars[a.hand[i]]
      const charB = scoreChars[b.hand[i]]

      const diffC = charA - charB
      if (diffC !== 0) {
        return diffC
      }
    }
  }

  return 0
}

function countChars (hand) {
  const counts = {}
  for (const char of hand) {
    counts[char] = (counts[char] || 0) + 1
  }
  return [Object.values(counts).sort().reverse(), counts.J || 0]
}

function countCharsJoker (hand) {
  const counts = {}
  let jc = 0
  for (const char of hand) {
    if (char !== 'J') {
      counts[char] = (counts[char] || 0) + 1
    } else {
      jc++
    }
  }

  return [Object.values(counts).sort().reverse(), jc]
}

function scoreHand (hand) {
  if (hand.toString() === '5') {
    return 7
  } else if (hand.toString() === '4,1') {
    return 6
  } else if (hand.toString() === '3,2') {
    return 5
  } else if (hand.toString() === '3,1,1') {
    return 4
  } else if (hand.toString() === '2,2,1') {
    return 3
  } else if (hand.toString() === '2,1,1,1') {
    return 2
  } else {
    return 1
  }
}

function scoreHandJokers (hand, jokers) {
  if (hand.length === 0) {
    hand[0] = 0
  }
  hand[0] += jokers
  if (hand.toString() === '5') {
    return 7
  } else if (hand.toString() === '4,1') {
    return 6
  } else if (hand.toString() === '3,2') {
    return 5
  } else if (hand.toString() === '3,1,1') {
    return 4
  } else if (hand.toString() === '2,2,1') {
    return 3
  } else if (hand.toString() === '2,1,1,1') {
    return 2
  } else {
    return 1
  }
}

const scoreChars = {
  A: 14, K: 13, Q: 12, J: 11, T: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2
}

const scoreCharsJoker = {
  A: 14, K: 13, Q: 12, J: 1, T: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2
}

export function calculateTotalWinningsJoker (lines) {
  const hands = lines.map(line => {
    const [hand, bid] = line.split(' ')
    return { hand, bid: parseInt(bid, 10) }
  }).sort(jokerRules)

  return hands.map((hand, idx) => hand.bid * (idx + 1)).reduce((acc, n) => acc + n, 0)
}

function jokerRules (a, b) {
  const [countA, jokersA] = countCharsJoker(a.hand)
  const [countB, jokersB] = countCharsJoker(b.hand)

  const scoreA = scoreHandJokers(countA, jokersA)
  const scoreB = scoreHandJokers(countB, jokersB)

  const diff = scoreA - scoreB
  if (diff !== 0) {
    return diff
  } else {
    for (let i = 0; i < 5; i++) {
      const charA = scoreCharsJoker[a.hand[i]]
      const charB = scoreCharsJoker[b.hand[i]]

      const diffC = charA - charB
      if (diffC !== 0) {
        return diffC
      }
    }
  }

  return 0
}
