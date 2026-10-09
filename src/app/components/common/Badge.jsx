import React from 'react'

function Badge({children,style}) {
  return (
    <div className={`px-3 py-1 rounded-2xl ${style}`}>{children}</div>
  )
}

export default Badge