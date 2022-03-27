import React from 'react'
import { Cell } from './Cell'


export const Board = ({ board, playerTurn, checkAvailableMoves, moveChecker }) => {

    return (
        <section className='board'>
            {board.map(row => {
                return row.map(cell => {
                    return <Cell key={`${cell.row}${cell.col}`} row={cell.row} col={cell.col}
                        checkerImg={cell.checkerImg} isMarked={cell.isMarked} playerTurn={playerTurn}
                        checkAvailableMoves={checkAvailableMoves} moveChecker={moveChecker} />
                })
            })}
        </section>
    )
}
