const fs = require('fs')

const input = fs.readFileSync('input.txt').toString().split('\n')

const elves = [0]

let elfNumber = 0

input.forEach(l => {
  if (l === '') {
    elfNumber++
    elves[elfNumber] = 0
  } else {
    elves[elfNumber] += +l
  }
})

const elvesSorted = elves.sort().reverse()

const top3 = elvesSorted.slice(0, 3).reduce((acc, cur) => acc + cur, 0)

console.log('Result #1:', elvesSorted[0]) // 64929
console.log('Result #2:', top3) // 193697
