import './style.css'

// initializing canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30
const COLOR = {
  BOARD: '#444',
  SOLID: '#02D',
  PIECE: '#2A0'
}

canvas.width = BOARD_WIDTH * BLOCK_SIZE
canvas.height = BOARD_HEIGHT * BLOCK_SIZE

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// board
const board = [
  ...Array(BOARD_HEIGHT - 1).fill(Array(BOARD_WIDTH).fill(0)),
  [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// piece
const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

// game loop
function update () {
  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  // drawing game area
  context.fillStyle = COLOR.BOARD
  context.fillRect(0, 0, canvas.width, canvas.height)

  // drawing board
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = COLOR.SOLID
        context.fillRect(x, y, 1, 1)
      }
    })
  })

  // drawing piece
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = COLOR.PIECE
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })
}

update()
