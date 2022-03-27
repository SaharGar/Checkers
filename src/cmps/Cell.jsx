import React, { useState, useEffect } from 'react'


export const Cell = ({ row, col, checkerImg, isMarked, checkAvailableMoves, moveChecker }) => {


    const [cellColor, setCellColor] = useState(null)
    const [player, setPlayer] = useState(null)


    useEffect(() => {
        const color = ((row + col) % 2 === 0) ? 'white' : 'black'
        setCellColor(color)
    }, [])

    useEffect(() => {
        if (checkerImg) {
            checkerImg.includes('red') ? setPlayer('red') : setPlayer('blue')
        }
    }, [checkerImg])

    const onMoveChecker = (e) => {
        if(isMarked) moveChecker(e)
    }

    if (!cellColor) <></>
    return (
        <section className={`cell ${cellColor} ${isMarked ? 'marked' : ''}`} data-row={row} data-col={col} onClick={onMoveChecker}>
            {(checkerImg && cellColor === 'black') && <div className='player' style={{ backgroundImage: `url(${checkerImg})` }} data-row={row} data-col={col} data-player={player} onClick={checkAvailableMoves}></div>}
        </section>
    )
}