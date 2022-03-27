import React, { useEffect, useState } from 'react'
import { Board } from './cmps/Board'

import bluePlayer from './assets/imgs/blue-player.svg'
import redPlayer from './assets/imgs/red-player.svg'


export const App = () => {

  const [board, setBoard] = useState(null)
  const [currCheker, setCurrChecker] = useState(null)

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

  const moveChecker = (e) => {
    const {row, col, player} = currCheker
    const targetRow = +e.target.getAttribute('data-row')
    const targetCol = +e.target.getAttribute('data-col')
    const newBoard = [...board]
    newBoard[row][col].checkerImg = undefined
    newBoard[targetRow][targetCol].checkerImg = player === 'red' ? redPlayer : bluePlayer
    setBoard(newBoard)
    resetMarked()
  }

  const checkAvailableMoves = (e) => {
    const row = +e.target.getAttribute('data-row')
    const col = +e.target.getAttribute('data-col')
    const player = e.target.getAttribute('data-player')
    if(currCheker?.row === row && currCheker?.col === col) toggleMarkOff()
    else {
      resetMarked()
      setCurrChecker({row, col, player})
      const newBoard = [...board]
      if (player === 'red') {
        if (row - 1 >= 0 && col - 1 >= 0 && !board[row - 1][col - 1].checkerImg) newBoard[row - 1][col - 1].isMarked = true
        if (row - 1 >= 0 && col + 1 < 8 && !board[row - 1][col + 1].checkerImg) newBoard[row - 1][col + 1].isMarked = true
      } else {
        if (row + 1 >= 0 && col - 1 >= 0 && !board[row + 1][col - 1].checkerImg) newBoard[row + 1][col - 1].isMarked = true
        if (row + 1 >= 0 && col + 1 < 8 && !board[row + 1][col + 1].checkerImg) newBoard[row + 1][col + 1].isMarked = true
      }
      setBoard(newBoard)
    }
  }

  const resetMarked = () => {
    const newBoard = [...board]
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        newBoard[row][col].isMarked = false
      }
    }
    setBoard(newBoard)
  }

  const toggleMarkOff = () => {
    const newBoard = [...board]
    const {row,col,player} = currCheker
    if (player === 'red') {
      if (row - 1 >= 0 && col - 1 >= 0) newBoard[row - 1][col - 1].isMarked = false
      if (row - 1 >= 0 && col + 1 < 8) newBoard[row - 1][col + 1].isMarked = false
    } else {
      if (row + 1 >= 0 && col - 1 >= 0) newBoard[row + 1][col - 1].isMarked = false
      if (row + 1 >= 0 && col + 1 < 8) newBoard[row + 1][col + 1].isMarked = false
    }
    setBoard(newBoard)
    setCurrChecker(null)
  }

  if (!board) return <></>
  return (
    <section>
      <Board board={board} checkAvailableMoves={checkAvailableMoves} moveChecker={moveChecker}/>
    </section>
  )
}
