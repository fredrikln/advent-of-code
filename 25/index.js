const inputRow = 3010
const inputCol = 3019

let counter = 0
let col = 0
let row = 0

const grid = []

const drawGrid = () => {
  grid.forEach(r => console.log(r.map(i => i.toString().padStart(17, ' ')).join(',')))
}

let val = 20151125
const step = () => {
  if (!grid[row]) { grid[row] = [] }

  grid[row][col] = val

  if (row === 0) {
    row = grid.length
    col = 0
  } else {
    row--
    col++
  }

  val = (val * 252533) % 33554393
}

while (!grid[inputRow-1] || !grid[inputRow-1][inputCol-1]) {
  step()
}

// drawGrid(grid)

console.log('Part 1:', grid[inputRow-1][inputCol-1])
