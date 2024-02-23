// TODO: could be simplified more

export function calculateTotalWinnings (lines) {
  const hands = lines.map(line => {
    const [hand, bid] = line.split(' ')
    return { hand, bid: parseInt(bid, 10) }
  }).sort(rules(false))

  return hands.map((hand, idx) => hand.bid * (idx + 1)).reduce((acc, n) => acc + n, 0)
}

export function calculateTotalWinningsJoker (lines) {
  const hands = lines.map(line => {
    const [hand, bid] = line.split(' ')
    return { hand, bid: parseInt(bid, 10) }
  }).sort(rules(true))

  return hands.map((hand, idx) => hand.bid * (idx + 1)).reduce((acc, n) => acc + n, 0)
}

function rules (useJokers) {
  return function jokerRules (a, b) {
    const scoreA = scoreHand(a.hand, useJokers)
    const scoreB = scoreHand(b.hand, useJokers)

    const diff = scoreA - scoreB
    if (diff !== 0) {
      return diff
    } else {
      for (let i = 0; i < 5; i++) {
        const charA = scoreChar(a.hand[i], useJokers)
        const charB = scoreChar(b.hand[i], useJokers)

        const diffC = charA - charB
        if (diffC !== 0) {
          return diffC
        }
      }
    }

    return 0
  }
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

function scoreHand (hand, useJokers) {
  let count, jokers
  if (useJokers) {
    [count, jokers] = countCharsJoker(hand)
    if (count.length === 0) {
      count[0] = 0
    }
    count[0] += jokers
  } else {
    [count, jokers] = countChars(hand)
  }

  if (count.toString() === '5') {
    return 7
  } else if (count.toString() === '4,1') {
    return 6
  } else if (count.toString() === '3,2') {
    return 5
  } else if (count.toString() === '3,1,1') {
    return 4
  } else if (count.toString() === '2,2,1') {
    return 3
  } else if (count.toString() === '2,1,1,1') {
    return 2
  } else {
    return 1
  }
}

function scoreChar (char, useJokers) {
  if (char === 'J') {
    return (useJokers && 1) || 11
  }
  return scores[char]
}

const scores = {
  A: 14, K: 13, Q: 12, J: 11, T: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2
}
