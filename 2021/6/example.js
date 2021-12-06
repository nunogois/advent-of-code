const input = `3,4,3,1,2`.split(',').map(Number)

function setFishData() {
  const fishData = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (i = 0; i < input.length; i++) {
    const fish = input[i]
    fishData[fish]++
  }
  return fishData
}

function getFish(days) {
  const fishData = setFishData()
  for (i = 1; i <= days; i++) {
    const newFish = fishData.shift()
    fishData[8] = newFish
    fishData[6] += newFish
  }
  return fishData.reduce((t, f) => t + f, 0)
}

console.log('Result #1:', getFish(80)) // 5934
console.log('Result #2:', getFish(256)) // 26984457539
