import React from 'react'

const Clock = ({time}) => {
    const date = new Date(null);
    date.setSeconds(time); // specify value for SECONDS here
    const result = date.toISOString().slice(14, 19);

  return (
    <div className="text-7xl p-2 m-2">{result}</div>
  )
}

export default Clock