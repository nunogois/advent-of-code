const fs = require('fs')

const input = fs.readFileSync('input.txt').toString().trim().split('\n')

let gamma = ''
let epsilon = ''

moreOnesInPos = (arr, pos) =>
  arr.filter(x => x[pos] === '1').length >=
  arr.filter(x => x[pos] === '0').length

for (let i = 0; i < input[0].length; i++) {
  if (moreOnesInPos(input, i)) {
    gamma += '1'
    epsilon += '0'
  } else {
    gamma += '0'
    epsilon += '1'
  }
}

let o_nums = input
let c_nums = input

i = 0
while (o_nums.length > 1) {
  if (moreOnesInPos(o_nums, i)) o_nums = o_nums.filter(l => l[i] === '1')
  else o_nums = o_nums.filter(l => l[i] === '0')
  i++
}

i = 0
while (c_nums.length > 1) {
  if (moreOnesInPos(c_nums, i)) c_nums = c_nums.filter(l => l[i] === '0')
  else c_nums = c_nums.filter(l => l[i] === '1')
  i++
}

const g_dec = parseInt(gamma, 2)
const e_dec = parseInt(epsilon, 2)

const o_dec = parseInt(o_nums[0], 2)
const c_dec = parseInt(c_nums[0], 2)

console.log('Result #1:', g_dec * e_dec) // 2261546
console.log('Result #2:', o_dec * c_dec) // 6775520
