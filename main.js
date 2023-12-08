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

const newEmptyRow = () => Array(BOARD_WIDTH).fill(0)
// board
const board = [
  ...Array(BOARD_HEIGHT - 1).fill(0).map(newEmptyRow),
  [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// pieces
const SHAPES = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [1, 1, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ]
]
const piece = {
  position: { x: 5, y: 5 },
  shape: randomShape()
}

function randomShape () {
  return SHAPES[Math.floor(Math.random() * SHAPES.length)]
}

// game loop
let dropCounter = 0
let lastTime = 0
function update (time = 0) {
  const deltaTime = time - lastTime
  lastTime = time

  dropCounter += deltaTime

  if (dropCounter > 1000) {
    piece.position.y++
    dropCounter = 0
    checkCollision()
  }

  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  // drawing game area
  context.fillStyle = COLOR.BOARD
  context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)

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

// piece movements
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    piece.position.x--
    pieceHasBeenCollided() && piece.position.x++
  }
  if (event.key === 'ArrowRight') {
    piece.position.x++
    pieceHasBeenCollided() && piece.position.x--
  }
  if (event.key === 'ArrowDown') {
    piece.position.y++
    checkCollision()
  }
})

function checkCollision () {
  pieceHasBeenCollided() && piece.position.y-- && solidifyPiece()
}

// piece collisions
function pieceHasBeenCollided () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return value !== 0 &&
        board[y + piece.position.y]?.[x + piece.position.x] !== 0
    })
  })
}

// solidify pieces
function solidifyPiece () {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })
  removeRows()

  // random piece
  piece.shape = randomShape()
  // reset position
  piece.position.x = 0
  piece.position.y = 0

  pieceHasBeenCollided() && window.alert('Game Over')
}

// remove board rows
function removeRows () {
  const rowsToRemove = []
  board.forEach((row, y) => {
    row.every(value => value === 1) && rowsToRemove.push(y)
  })

  rowsToRemove.forEach(row => {
    board.splice(row, 1)
    board.unshift(newEmptyRow())
  })
}

update()
