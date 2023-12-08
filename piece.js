import { BOARD_WIDTH, SHAPES } from './constants'

export function initialPosition () {
  return { x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 }
}

export function randomShape () {
  return SHAPES[Math.floor(Math.random() * SHAPES.length)]
}
