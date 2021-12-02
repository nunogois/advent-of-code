const fs = require('fs')

const input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map(l => +l)

let increases = 0
let block_increases = 0

let prev_block

input.forEach((l, i) => {
  if (l > input[i - 1]) increases++

  const block = l + input[i + 1] + input[i + 2]
  if (block > prev_block) block_increases++
  prev_block = block
})

console.log('Result #1:', increases) // 1477
console.log('Result #2:', block_increases) // 1523
