const input = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`

// unique: 1, 4, 7, 8
// 5: 2, 3, 5
// 6: 0, 6, 9

const map = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6
}

const letterMap = {
  c: '',
  e: '',
  f: ''
}

const pattern = input.split(' | ')[0].trim().split(' ')
const result = input.split(' | ')[1].trim().split(' ')

const solve = {}
const solve_5d = []
const solve_6d = []

pattern.forEach(digit => {
  if (digit.length === 2) solve[1] = digit
  // 1
  else if (digit.length === 3) solve[7] = digit
  // 7
  else if (digit.length === 4) solve[4] = digit
  // 4
  else if (digit.length === 7) solve[8] = digit
  // 8
  else if (digit.length === 5) solve_5d.push(digit)
  // 2, 3, 5
  else if (digit.length === 6) solve_6d.push(digit) // 0, 6, 9
})

// 6
solve_6d.forEach(digit => {
  if (!digit.includes(solve[1][0]) || !digit.includes(solve[1][1])) {
    solve[6] = digit
    letterMap.c = !digit.includes(solve[1][0]) ? solve[1][0] : solve[1][1]
    letterMap.f = !digit.includes(solve[1][0]) ? solve[1][1] : solve[1][0]
  }
})

// 5, 2, 3
solve_5d.forEach(digit => {
  if (!digit.includes(letterMap.c)) solve[5] = digit
  else if (!digit.includes(letterMap.f)) solve[2] = digit
  else solve[3] = digit
})

solve[2].split('').forEach(letter => {
  if (!solve[5].includes(letter) && letter !== letterMap.c) {
    letterMap.e = letter
  }
})

// 9
solve_6d.forEach(digit => {
  if (digit !== solve[6]) {
    if (!digit.includes(letterMap.e)) solve[9] = digit
    else solve[0] = digit
  }
})

const solution = {}
Object.keys(solve).forEach(key => {
  solution[solve[key].split('').sort().join('')] = key
})

console.log('solution', solution)

const total = result.reduce(
  (t, l) => t + solution[l.split('').sort().join('')],
  ''
)

console.log('Result #1:', total)
