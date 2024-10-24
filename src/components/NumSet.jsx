import classNames from 'classnames'
import React from 'react'

const NumSet = ({value, active, onClick}) => {
    const styles = classNames('py-1 px-7 leading-none border-2 text-4xl  rounded-md', {
        'border-gray-500 text-gray-500': !active,
        'border-green-500 text-green-500': active,
    })
  return (
    <li className='flex items-center justify-center'>
        <span onClick={onClick} className={styles}>{value}</span>
    </li>
  )
}

export default NumSet