"use client"

function Button({children,style,submit}) {
  return (
    <button onClick={()=> submit?.()} className={`cursor-pointer px-4 py-3 bg-primary-color text-[14px] font-semibold text-white rounded-[10px] ${style}`}>
      {children}
    </button>
  )
}

export default Button
