const fs = require('fs')

const input = fs.readFileSync('input.txt').toString().trim().split('\n')

let position = 0
let depth = 0
let aim = 0

input.forEach(l => {
  const direction = l.split(' ')[0]
  const value = +l.split(' ')[1]

  if (direction === 'forward') {
    position += value
    depth += aim * value
  } else aim += direction === 'up' ? -value : value
})

console.log('Result #1:', position * aim) // 2091984
console.log('Result #2:', position * depth) // 2086261056
