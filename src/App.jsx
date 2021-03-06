import React, { useEffect, useState } from 'react'
import { Board } from './cmps/Board'
import { Buttons } from './cmps/Buttons'

import bluePlayer from './assets/imgs/blue-player.svg'
import redPlayer from './assets/imgs/red-player.svg'


export const App = () => {

  const [board, setBoard] = useState(null)
  const [currCheker, setCurrChecker] = useState(null)
  const [playerTurn, setPlayerTurn] = useState(null)
  const [redCheckersLeft, setRedCheckersLeft] = useState(null)
  const [blueCheckersLeft, setBlueCheckersLeft] = useState(null)
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    initGame()
  }, [])

  useEffect(() => {
    if(board) checkForWin()
  },[blueCheckersLeft,redCheckersLeft])

  const initGame = () => {
    createBoard()
    setStartingPlayer()
    setRedCheckersLeft(12)
    setBlueCheckersLeft(12)
    setWinner(false)
  }

  const setStartingPlayer = () => {
    const num = Math.random()
    if (num <= 0.5) setPlayerTurn('red')
    else setPlayerTurn('blue')
  }

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

  const checkForWin = () => {
    if(blueCheckersLeft === 0) setWinner('red')
    else if(redCheckersLeft === 0) setWinner('blue')
  }

  const eatChecker = (targetCol) => {
    const { row, col, player } = currCheker
    const newBoard = [...board]
    if (player === 'red') {
      if ((targetCol - col) === 2) newBoard[row - 1][col + 1].checkerImg = undefined
      else newBoard[row - 1][col - 1].checkerImg = undefined
      setBlueCheckersLeft(prevCheckersLeft => prevCheckersLeft - 1)
    } else {
      if ((targetCol - col) === 2) newBoard[row + 1][col + 1].checkerImg = undefined
      else newBoard[row + 1][col - 1].checkerImg = undefined
      setRedCheckersLeft(prevCheckersLeft => prevCheckersLeft - 1)
    }

  }

  const moveChecker = (e) => {
    const { row, col, player } = currCheker
    const targetRow = +e.target.getAttribute('data-row')
    const targetCol = +e.target.getAttribute('data-col')
    const newBoard = [...board]
    if (Math.abs(col - targetCol) === 2) eatChecker(targetCol)
    newBoard[row][col].checkerImg = undefined
    newBoard[targetRow][targetCol].checkerImg = player === 'red' ? redPlayer : bluePlayer
    setBoard(newBoard)
    resetMarked()
    setCurrChecker(null)
    setPlayerTurn(playerTurn === 'red' ? 'blue' : 'red')
  }

  const checkAvailableMoves = (e) => {
    const row = +e.target.getAttribute('data-row')
    const col = +e.target.getAttribute('data-col')
    const player = e.target.getAttribute('data-player')
    resetMarked()
    if (currCheker?.row === row && currCheker?.col === col) setCurrChecker(null)
    else {
      setCurrChecker({ row, col, player })
      const newBoard = [...board]
      if (player === 'red') {
        if (row - 1 >= 0 && col - 1 >= 0) {
          if (!board[row - 1][col - 1].checkerImg) {
            newBoard[row - 1][col - 1].isMarked = true
          }
          else if (board[row - 1][col - 1].checkerImg.includes('blue') && row - 2 >= 0 && col - 2 >= 0 && !board[row - 2][col - 2].checkerImg) {
            newBoard[row - 2][col - 2].isMarked = true
          }
        }
        if (row - 1 >= 0 && col + 1 < 8) {
          if (!board[row - 1][col + 1].checkerImg) {
            newBoard[row - 1][col + 1].isMarked = true
          }
          else if (board[row - 1][col + 1].checkerImg.includes('blue') && row - 2 >= 0 && col + 2 < 8 && !board[row - 2][col + 2].checkerImg) {
            newBoard[row - 2][col + 2].isMarked = true
          }
        }
      } else {
        if (row + 1 <= 7 && col - 1 >= 0) {
          if (!board[row + 1][col - 1].checkerImg) {
            newBoard[row + 1][col - 1].isMarked = true
          }
          else if (board[row + 1][col - 1]?.checkerImg.includes('red') && row + 2 <= 7 && col - 2 >= 0 && !board[row + 2][col - 2].checkerImg) {
            newBoard[row + 2][col - 2].isMarked = true
          }
        }
        if (row + 1 <= 7 && col + 1 < 8) {
          if (!board[row + 1][col + 1].checkerImg) {
            newBoard[row + 1][col + 1].isMarked = true
          }
          else if (board[row + 1][col + 1]?.checkerImg.includes('red') && row + 2 <= 7 && col + 2 < 8 && !board[row + 2][col + 2].checkerImg) {
            newBoard[row + 2][col + 2].isMarked = true
          }
        }
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


  if (!board) return <></>
  return (
    <section className='app'>
      <h1><span>{playerTurn}</span> Player Turn</h1>
      {winner && <h2><span>{winner}</span> Won</h2>}
      <h3 className='red'>Red: {redCheckersLeft} left</h3>
      <h3 className='blue'>Blue: {blueCheckersLeft} left</h3>
      <Buttons initGame={initGame}/>
      <Board board={board} playerTurn={playerTurn} checkAvailableMoves={checkAvailableMoves} moveChecker={moveChecker} />
    </section>
  )
}
