const fs = require('fs')

const input = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(i => {
    const p = i.split(' -> ')
    const p1 = p[0].split(',')
    const p2 = p[1].split(',')
    return { x1: +p1[0], y1: +p1[1], x2: +p2[0], y2: +p2[1] }
  })

const grid = {}
const grid_max = 1000

function resetGrid() {
  for (y = 0; y <= grid_max; y++) {
    for (x = 0; x <= grid_max; x++) {
      grid[`${x},${y}`] = 0
    }
  }
}

function fillGrid(i) {
  const x_distance = i.x2 - i.x1
  const y_distance = i.y2 - i.y1
  const x_order = x_distance > 0 ? 1 : -1
  const y_order = y_distance > 0 ? 1 : -1
  let x = i.x1
  let y = i.y1
  for (i = 0; i <= Math.abs(x_distance || y_distance); i++) {
    grid[`${x},${y}`] += 1
    x += x_distance ? x_order : 0
    y += y_distance ? y_order : 0
  }
}

// HOR + VER
resetGrid()
input.forEach(i => {
  if (i.x1 === i.x2 || i.y1 === i.y2) fillGrid(i)
})

let intersectionsHorVer = 0
Object.keys(grid).forEach(p => {
  if (grid[p] > 1) {
    intersectionsHorVer++
  }
})

// ALL
resetGrid()
input.forEach(i => {
  fillGrid(i)
})

let intersections = 0
Object.keys(grid).forEach(p => {
  if (grid[p] > 1) {
    intersections++
  }
})

console.log('Result #1:', intersectionsHorVer) // 7674
console.log('Result #2:', intersections) // 20898
