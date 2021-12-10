const fs = require('fs')

const lines = fs.readFileSync('input.txt').toString().trim().split('\n')

const lTotal = lines.length
const cTotal = lines[0].length

const lows = []

for (l = 0; l < lTotal; l++) {
  for (c = 0; c < cTotal; c++) {
    const current = lines[l][c]
    const above = lines[l - 1] ? lines[l - 1][c] : '10'
    const below = lines[l + 1] ? lines[l + 1][c] : '10'
    const left = lines[l][c - 1] ? lines[l][c - 1] : '10'
    const right = lines[l][c + 1] ? lines[l][c + 1] : '10'

    if (
      +current < +above &&
      +current < +below &&
      +current < +left &&
      +current < +right
    ) {
      lows.push({ value: +current, pos: { l, c } })
    }
  }
}

const basins = []

function spread(l, c, matrix) {
  matrix[l][c] = 'X'

  const above =
    lines[l - 1] && matrix[l - 1][c] === 'O' ? lines[l - 1][c] : '10'
  const below =
    lines[l + 1] && matrix[l + 1][c] === 'O' ? lines[l + 1][c] : '10'
  const left =
    lines[l][c - 1] && matrix[l][c - 1] === 'O' ? lines[l][c - 1] : '10'
  const right =
    lines[l][c + 1] && matrix[l][c + 1] === 'O' ? lines[l][c + 1] : '10'

  if (+above < 9) matrix = spread(l - 1, c, matrix)
  if (+below < 9) matrix = spread(l + 1, c, matrix)
  if (+left < 9) matrix = spread(l, c - 1, matrix)
  if (+right < 9) matrix = spread(l, c + 1, matrix)

  return matrix
}

function newMatrix() {
  return ('O'.repeat(cTotal) + '\n')
    .repeat(lTotal)
    .trim()
    .split('\n')
    .map(l => l.split(''))
}

lows.forEach(low => {
  basins.push(
    spread(low.pos.l, low.pos.c, newMatrix())
      .map(l => l.join(''))
      .join('')
      .replace(/O/g, '').length
  )
})

console.log(
  'Result #1:',
  lows.reduce((a, b) => a + b.value + 1, 0)
) // 498

console.log(
  'Result #2:',
  basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1)
) // 1071000
