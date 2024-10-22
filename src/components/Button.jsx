import classNames from 'classnames'
import React from 'react'

const Button = ({children, color, handleClick,  disable }) => {
   //  bg-green-300 hover:bg-green-400 active:bg-green-600
   const ButtonClass = classNames(
    'w-max-[300] rounded-md w-full flex justify-center items-center py-4 font-bold uppercase disabled',
    {
      
      'bg-green-300 hover:bg-green-400 active:bg-green-600' : color==='green' && !disable,
      'hover:bg-red-500 bg-red-400 active:bg-red-600 ' : color==='red' && !disable,
      'bg-slate-200 text-slate-400': disable,

   }
    )
  return (
    <button
        className={ButtonClass}
        onClick={handleClick}
        disabled={disable}
    >{children }</button>
  )
}

export default Button