const input = `16,1,2,0,4,2,7,1,2,14`.split(',').map(Number)

const max = input.sort((a, b) => a - b)[input.length - 1]

function getCheapest(increasing) {
  let cheapest

  for (i = 0; i <= max; i++) {
    let fuel = input.reduce((t, c) => {
      let distance = Math.abs(c - i)
      if (increasing) distance = (distance ** 2 + distance) / 2
      return t + distance
    }, 0)
    if (!cheapest || fuel < cheapest) cheapest = fuel
  }

  return cheapest
}

console.log('Result #1:', getCheapest()) // 37
console.log('Result #2:', getCheapest(true)) // 168
