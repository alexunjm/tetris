import './style.css'

// initializing canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30

canvas.width = BOARD_WIDTH * BLOCK_SIZE
canvas.height = BOARD_HEIGHT * BLOCK_SIZE

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// game loop
function update () {
  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  context.fillStyle = '#444'
  context.fillRect(0, 0, canvas.width, canvas.height)
}
update()
