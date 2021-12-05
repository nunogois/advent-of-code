const fs = require('fs')

const input = fs.readFileSync('input.txt').toString().trim().split('\n')

const nums = input[0].split(',')
const boards = []

for (i = 2; i < input.length; i += 6) {
  const lines = input.slice(i, i + 5).map(l =>
    l
      .trim()
      .split(' ')
      .map(c => c.trim())
      .filter(c => c !== '')
  )

  const cols = []
  for (c = 0; c < 5; c++) {
    const col = []
    lines.forEach(l => {
      col.push(l[c])
    })
    cols.push(col)
  }

  const all = lines
    .map(l => l.join())
    .join()
    .split(',')

  boards.push({ lines, cols, all })
}

let winnerBoards = []

for (i = 5; i <= nums.length; i++) {
  const numsSoFar = nums.slice(0, i)

  boards
    .filter(
      b =>
        (b.cols.filter(c => c.filter(n => numsSoFar.includes(n)).length === 5)
          .length ||
          b.lines.filter(l => l.filter(n => numsSoFar.includes(n)).length === 5)
            .length) &&
        !winnerBoards.filter(w => w.board === b).length
    )
    .forEach(winnerBoard => {
      winnerBoards.push({
        board: winnerBoard,
        num: nums[i - 1],
        sum: winnerBoard.all
          .filter(n => !numsSoFar.includes(n))
          .reduce((t, n) => t + +n, 0)
      })
    })
}

console.log('Result #1:', winnerBoards[0].sum * winnerBoards[0].num) // 58374
console.log(
  'Result #2:',
  winnerBoards[winnerBoards.length - 1].sum *
    winnerBoards[winnerBoards.length - 1].num
) // 11377
