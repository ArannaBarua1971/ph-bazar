import React from 'react'

function TitleHeader({title,titleStyle="text-[20px]",subtitle="",subtitleStyle="text-[16px]" ,style}) {
  return (
    <div className={`my-5 ${style}`}>
        <h1 className={`font-bold  text-primary-text-color ${titleStyle}`}>{title}</h1>
        <p className={` text-secondary-text-color ${subtitleStyle}`}>{subtitle}</p>
    </div>
  )
}

export default TitleHeader        