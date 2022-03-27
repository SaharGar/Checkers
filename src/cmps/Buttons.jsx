import React from 'react'

export const Buttons = ({initGame}) => {
  return (
      <section className='btns'>
          <button onClick={initGame}>New Game</button>
      </section>
  )
}
