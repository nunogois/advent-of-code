const fs = require('fs')

const input = fs.readFileSync('input.txt').toString().trim().split('\n')

// unique: 1, 4, 7, 8
// 5: 2, 3, 5
// 6: 0, 6, 9

function decode(line) {
  const letterMap = {
    c: '',
    e: '',
    f: ''
  }

  const pattern = line.split(' | ')[0].trim().split(' ')
  const result = line.split(' | ')[1].trim().split(' ')

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

  return +result.reduce((t, l) => t + solution[l.split('').sort().join('')], '')
}

let total = 0
input.forEach(line => {
  line
    .split('|')[1]
    .trim()
    .split(' ')
    .forEach(digit => {
      if (digit.length !== 5 && digit.length !== 6) total++
    })
})

let total2 = 0
input.forEach(line => {
  total2 += decode(line)
})

console.log('Result #1:', total) // 514
console.log('Result #2:', total2) // 1012272
