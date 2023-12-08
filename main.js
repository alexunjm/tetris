import './style.css'

// initializing canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30
const COLOR = {
  SOLID: '#02D'
}

canvas.width = BOARD_WIDTH * BLOCK_SIZE
canvas.height = BOARD_HEIGHT * BLOCK_SIZE

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// board
const board = [
  ...Array(BOARD_HEIGHT - 1).fill(Array(BOARD_WIDTH).fill(0)),
  [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// game loop
function update () {
  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  context.fillStyle = '#444'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = COLOR.SOLID
        context.fillRect(x, y, 1, 1)
      }
    })
  })
}

update()
