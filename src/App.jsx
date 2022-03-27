import React, { useEffect, useState } from 'react'
import { Board } from './cmps/Board'

import bluePlayer from './assets/imgs/blue-player.svg'
import redPlayer from './assets/imgs/red-player.svg'


export const App = () => {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    createBoard()
  }, [])

  const createBoard = () => {
    let newBoard = []
    let p = 0
    let checkerImg
    for (let row = 0; row < 8; row++) {
      newBoard[row] = []
      if (row === 3) p++
      for (let col = 0; col < 8; col++) {
        if (p === 0 && row <= 2) checkerImg = bluePlayer
        else if (row > 2 && row < 5) checkerImg = undefined
        else checkerImg = redPlayer
        newBoard[row][col] = { checkerImg, row, col, isMarked: false }
      }
    }
    setBoard(newBoard)
  }

  if (!board) return <></>
  return (
    <section>
      <Board board={board} />
    </section>
  )
}
