import React from 'react'
import { Cell } from './Cell'


export const Board = ({ board, checkAvailableMoves, moveChecker }) => {
    // console.log(board )

    return (
        <section className='board'>
            {board.map(row => {
                return row.map(cell => {
                    return <Cell key={`${cell.row}${cell.col}`} row={cell.row} col={cell.col} checkerImg={cell.checkerImg}
                       isMarked={cell.isMarked} checkAvailableMoves={checkAvailableMoves} moveChecker={moveChecker}/>
                })
            })}
        </section>
    )
}
