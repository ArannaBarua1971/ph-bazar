import React from 'react'

function TitleHeader({title,titleStyle,subtitle="",subtitleStyle=""}) {
  return (
    <div className='my-5'>
        <h1 className={`font-bold text-[20px] text-primary-text-color${titleStyle}`}>{title}</h1>
        <p className={`text-[16px] text-secondary-text-color ${subtitleStyle}`}>{subtitle}</p>
    </div>
  )
}

export default TitleHeader        